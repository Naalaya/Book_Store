module.exports = (srv) => {

    const {Books} = cds.entities ('my.bookshop')
        
    //  Create the order when customer order books
    srv.before('CREATE', 'Orders', async(request)=>{
        const order = request.data
        if(!order.amount || order.amoutn<=0) return request.error(400, 'Order at least 1 book')
        
        const affectedRows = await cds.transaction(request).run(
            UPDATE(Books)
                .set ({stock:{'-=':order.amount}})
                .where ({stock:{'>=':order.amount},/*and*/ID: order.book_ID})
        )
        if (affectedRows===0) request.error(409, "Sorry, We solded out")
    })
    // Add some discount for overstocked books
    srv.after('READ', 'Books', each=>{
        if (each.stock>111) each.title+= '--11% discount!'
    })
  
  }
  