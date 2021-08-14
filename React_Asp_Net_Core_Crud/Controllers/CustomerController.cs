using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net;
using React_Asp_Net_Core_Crud.Models;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using React_Asp_Net_Core_Crud.DAL;

namespace React_Asp_Net_Core_Crud.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICMVCContext _context;
        private ICustomerRepository _customerRepository;
        public CustomerController(ICMVCContext context)
        {
            _context = context;
            _customerRepository = new CustomerRepository(_context);
        }

        // GET: api/<CustomerController>
        [HttpGet]
        public JsonResult Get(int? offset, int? limit, string sortOrder)
        {
            int totalCustomers = _customerRepository.GetTotalCustomerCount();
            List<Customers> customers = _customerRepository.GetAll(offset ?? 0, limit ?? 10, sortOrder).ToList();

            return new JsonResult(new { totalRecord = totalCustomers, data = customers });
        }

        // GET api/<CustomerController>/GetAll
        [HttpGet]
        public IEnumerable<Customers> GetAll(int id)
        {
            return _customerRepository.GetAlldata();
        }


        // GET api/<CustomerController>/5
        [HttpGet("{id}")]
        public Customers GetByID(int id)
        {
            return _customerRepository.GetById(id);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Customers customer)
        {
            if (ModelState.IsValid)
            {
                var result = _customerRepository.Insert(customer);
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

                    StatusCode = HttpStatusCode.BadRequest,
                };

                return response;
            }
        }


        // PUT api/<CustomerController>/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Customers customer)
        {
            if (ModelState.IsValid)
            {
                var customerModel = _customerRepository.GetById(id);
                customerModel.Name = customer.Name;
                customerModel.Address = customer.Address;
                var result = _customerRepository.Update(customerModel);
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

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            var result = _customerRepository.Delete(id);
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
