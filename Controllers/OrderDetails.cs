namespace UberEats.Controllers
{
    public class OrderDetails
    {
        public int OrderId { get; set; }
        public string ProdName { get; set; }
        public string ProdDesc { get; set; }
        public string totalPrice { get; set; }
        public string AddressOrder { get; set; }
        public string OrderStatus { get; set; }
        public string DeliveryStatus { get; set; }


        public OrderDetails() { }
    }
}