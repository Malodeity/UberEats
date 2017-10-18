using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using UberEats.models;

namespace UberEats.Controllers
{
    public class ProdGalleriesController : ApiController
    {
        private CustomerDbEntities1 db = new CustomerDbEntities1();

        // GET: api/ProdGalleries
        public IQueryable<ProdGallery> GetProdGalleries()
        {
            return db.ProdGalleries;
        }

        // GET: api/ProdGalleries/5
        [ResponseType(typeof(ProdGallery))]
        public IHttpActionResult GetProdGallery(int id)
        {
            ProdGallery prodGallery = db.ProdGalleries.Find(id);
            if (prodGallery == null)
            {
                return NotFound();
            }

            return Ok(prodGallery);
        }

        public String POST()
        {
            int counter = 0;

            //COLLECTING FILES------->
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            ProdGallery picfun = new ProdGallery();

            String Status = "";
            for (int i = 0; i < files.Count; i++)
            {

                //GET THE POSTED FILES------>
                System.Web.HttpPostedFile file = files[i];

                string fileName = new FileInfo(file.FileName).Name;


                if (file.ContentLength > 0)
                {
                    Guid id = Guid.NewGuid();

                    string modifiedFileName = id.ToString() + "_" + fileName;

                    byte[] imageb = new byte[file.ContentLength];
                    file.InputStream.Read(imageb, 0, file.ContentLength);

                    picfun.Image = imageb;
                    db.ProdGalleries.Add(picfun);
                    db.SaveChanges();
                    counter++;

                }

            }

            if (counter > 0)
            {
                return Status;
            }
            return "Upload Failed";
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProdGalleryExists(int id)
        {
            return db.ProdGalleries.Count(e => e.GalleryId == id) > 0;
        }
    }
}