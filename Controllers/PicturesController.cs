using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using UberEats.models;
using System.Web;
using System.IO;

namespace UberEats.Controllers
{
    public class PicturesController : ApiController
    {
        private CustomerDbEntities1 db = new CustomerDbEntities1();

        // GET: api/Pictures
        public IQueryable<Picture> GetPictures()
        {
            return db.Pictures;
        }

        // GET: api/Pictures/5
        [ResponseType(typeof(Picture))]
        public IHttpActionResult GetPicture(int id)
        {
            Picture picture = db.Pictures.Find(id);
            if (picture == null)
            {
                return NotFound();
            }

            return Ok(picture);
        }
        public String POST()
        {
            int counter = 0;

            //COLLECTING FILES------->
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            Picture picfun = new Picture();

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
                    db.Pictures.Add(picfun);
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

        private bool PictureExists(int id)
        {
            return db.Pictures.Count(e => e.picId == id) > 0;
        }
    }
}