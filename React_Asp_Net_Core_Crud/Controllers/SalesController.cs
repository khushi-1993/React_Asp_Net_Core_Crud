using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.DAL;
using React_Asp_Net_Core_Crud.DAL.Repository;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using React_Asp_Net_Core_Crud.Models;
using System.Net.Http;
using System.Net;


namespace React_Asp_Net_Core_Crud.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ICMVCContext _context;
        private ISalesRepository _salesRepository;
        public SalesController(ICMVCContext context)
        {
            _context = context;
            _salesRepository = new SalesRepository(_context);
        }

        // GET: api/<SalesController>
        [HttpGet]
        public JsonResult Get(int? offset, int? limit, string sortOrder)
        {
            int totalSales = _salesRepository.GetTotalSaleCount();
            List<SalesViewModel> sales = _salesRepository.GetAll(offset ?? 0, limit ?? 10, sortOrder).ToList();

            return new JsonResult(new { totalRecord = totalSales, data = sales });
        }

        // GET api/<SalesController>/5
        [HttpGet("{id}")]
        public Sales GetByID(int id)
        {
            return _salesRepository.GetById(id);
        }

        // GET api/<SalesController>/GetAll
        [HttpGet]
        public IEnumerable<Sales> GetAll(int id)
        {
            return _salesRepository.GetAlldata();
        }

        // POST api/<SalesController>
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Sales sales)
        {
            if (ModelState.IsValid)
            {
                var result = _salesRepository.Insert(sales);
                if (result)
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };

                    return response;
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {

                        StatusCode = HttpStatusCode.BadRequest
                    };

                    return response;
                }
            }
            else
            {
                var response = new HttpResponseMessage()
                {

                    StatusCode = HttpStatusCode.BadRequest
                };

                return response;
            }
        }

        // PUT api/<SalesController>/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Sales sales)
        {
            if (ModelState.IsValid)
            {
                var salesModel = _salesRepository.GetById(id);
                salesModel.ProductId = sales.ProductId;
                salesModel.CustomerId = sales.CustomerId;
                salesModel.StoreId = sales.StoreId;
                salesModel.DateSold = sales.DateSold;

                var result = _salesRepository.Update(salesModel);
                if (result)
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };

                    return response;
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };

                    return response;
                }
            }
            else
            {
                var response = new HttpResponseMessage()
                {

                    StatusCode = HttpStatusCode.BadRequest
                };

                return response;
            }
        }

        // DELETE api/<SalesController>/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            var result = _salesRepository.Delete(id);
            if (result)
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };
                return response;
            }
            else
            {
                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest
                };
                return response;
            }
        }
    }
}
