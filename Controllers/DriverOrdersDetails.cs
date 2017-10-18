using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UberEats.Controllers
{
    public class DriverOrdersDetails
    {

        public int OrderId { get; set; }
        public int Id { get; set; }
        public string AddressOrder { get; set; }
        public string totalPrice { get; set; }
        public string email { get; set; }
        public string OrderStatus { get; set; }
        public string DeliveryStatus { get; set; }
        public DriverOrdersDetails() { }


    }
}