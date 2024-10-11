using my.bookshop from '../db/schema';

service CatalogService {
entity Books @readonly as projection on bookshop.Books;
entity Authors @readonly as projection on bookshop.Authors;
entity Orders @readonly as projection on bookshop.Orders;

}