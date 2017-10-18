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

namespace UberEats.Controllers
{
    public class OrderCopiesController : ApiController
    {
        private CustomerDbEntities1 db = new CustomerDbEntities1();

        // GET: api/OrderCopies
        public IQueryable<OrderCopy> GetOrderCopies()
        {
            return db.OrderCopies;
        }

        // GET: api/OrderCopies/5
        [ResponseType(typeof(OrderCopy))]
        public IHttpActionResult GetOrderCopy(int id)
        {
            OrderCopy orderCopy = db.OrderCopies.Find(id);
            if (orderCopy == null)
            {
                return NotFound();
            }

            return Ok(orderCopy);
        }

        // PUT: api/OrderCopies/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrderCopy(int id, OrderCopy orderCopy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderCopy.PId)
            {
                return BadRequest();
            }

            db.Entry(orderCopy).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderCopyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/OrderCopies
        [ResponseType(typeof(OrderCopy))]
        public IHttpActionResult PostOrderCopy(OrderCopy orderCopy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderCopies.Add(orderCopy);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OrderCopyExists(orderCopy.PId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = orderCopy.PId }, orderCopy);
        }

        // DELETE: api/OrderCopies/5
        [ResponseType(typeof(OrderCopy))]
        public IHttpActionResult DeleteOrderCopy(int id)
        {
            OrderCopy orderCopy = db.OrderCopies.Find(id);
            if (orderCopy == null)
            {
                return NotFound();
            }

            db.OrderCopies.Remove(orderCopy);
            db.SaveChanges();

            return Ok(orderCopy);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderCopyExists(int id)
        {
            return db.OrderCopies.Count(e => e.PId == id) > 0;
        }

        [Route("api/GetOrder")]
        public IEnumerable<OrderDetails> getInfo()
        {
            GetOrders_Result oj = new GetOrders_Result();
            var result = db.Database.SqlQuery<OrderDetails>("SELECT z.OrderId ,ProdName ,ProdDesc ,totalPrice ,AddressOrder ,OrderStatus, DeliveryStatus FROM dbo.[Order] z, dbo.Product b, dbo.OrderCopy o, dbo.Customer g WHERE z.OrderId = o.orderid AND b.ProdId = o.product_id AND g.Id = z.Id");

            return result;
        }
    }
}