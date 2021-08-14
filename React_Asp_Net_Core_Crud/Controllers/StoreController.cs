using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.DAL.Repository;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using React_Asp_Net_Core_Crud.Models;
using System.Net.Http;
using System.Net;

namespace React_Asp_Net_Core_Crud.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StoreController : ControllerBase
    {

        private readonly ICMVCContext _context;
        private IStoreRepository _storeRepository;
        public StoreController(ICMVCContext context)
        {
            _context = context;
            _storeRepository = new StoreRepository(_context);
        }

        // GET: api/<StoreController>
        [HttpGet]
        public JsonResult Get(int? offset, int? limit, string sortOrder)
        {
            int totalStore = _storeRepository.GetTotalStoreCount();
            List<Stores> stores = _storeRepository.GetAll(offset ?? 0, limit ?? 10, sortOrder).ToList();

            return new JsonResult(new { totalRecord = totalStore, data = stores });
        }

        // GET api/<StoreController>/5
        [HttpGet("{id}")]
        public Stores GetByID(int id)
        {
            return _storeRepository.GetById(id);
        }

        // GET api/<StoreController>/GetAll
        [HttpGet]
        public IEnumerable<Stores> GetAll(int id)
        {
            return _storeRepository.GetAlldata();
        }

        // POST api/<StoreController>
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Stores store)
        {
            if (ModelState.IsValid)
            {
                var result = _storeRepository.Insert(store);
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

        // PUT api/<StoreController>/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Stores store)
        {
            if (ModelState.IsValid)
            {
                var storeModel = _storeRepository.GetById(id);
                storeModel.Name = store.Name;
                storeModel.Address = store.Address;
                var result = _storeRepository.Update(storeModel);
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

        // DELETE api/<StoreController>/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            var result = _storeRepository.Delete(id);
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
