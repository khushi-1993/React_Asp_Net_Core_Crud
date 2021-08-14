using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.DAL;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using React_Asp_Net_Core_Crud.Models;
using System.Net.Http;
using System.Net;
using React_Asp_Net_Core_Crud.DAL.Repository;


namespace React_Asp_Net_Core_Crud.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ICMVCContext _context;
        private IProductRepository _productRepository;
        public ProductController(ICMVCContext context)
        {
            _context = context;
            _productRepository = new ProductRepository(_context);
        }

        // GET: api/<ProductController>
        [HttpGet]
        public JsonResult Get(int? offset, int? limit, string sortOrder)
        {
            int totalProducts = _productRepository.GetTotalProductCount();
            List<Products> products = _productRepository.GetAll(offset ?? 0, limit ?? 10, sortOrder).ToList();

            return new JsonResult(new { totalRecord = totalProducts, data = products });
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public Products GetByID(int id)
        {
            return _productRepository.GetById(id);
        }

        // GET api/<ProductController>/GetAll
        [HttpGet]
        public IEnumerable<Products> GetAll(int id)
        {
            return _productRepository.GetAlldata();
        }

        // POST api/<ProductController>
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Products product)
        {
            if (ModelState.IsValid)
            {
                var result = _productRepository.Insert(product);
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

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Products product)
        {
            if (ModelState.IsValid)
            {
                var productModel = _productRepository.GetById(id);
                productModel.Name = product.Name;
                productModel.Price = product.Price;
                var result = _productRepository.Update(productModel);
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

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            var result = _productRepository.Delete(id);
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
