namespace UberEats.Controllers
{
    public class ProdDetails
    {
        public string ProdId { get; set; }
        public string ProdName { get; set; }
        public string ProdDesc { get; set; }
        public string ProdPrice { get; set; }
        public byte[] Image { get; set; }

        public ProdDetails() { }

    }
}
