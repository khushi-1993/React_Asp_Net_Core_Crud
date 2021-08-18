using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using Microsoft.EntityFrameworkCore;


namespace React_Asp_Net_Core_Crud.DAL.Repository
{
    public class StoreRepository : IStoreRepository
    {
        private readonly ICMVCContext _dbContext;
        public StoreRepository()
        {
            _dbContext = new ICMVCContext();
        }

        public StoreRepository(ICMVCContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Stores> GetAll(int offset, int limit, string sortOrder)
        {
            try
            {
                offset = offset < 0 ? 0 : offset;
                limit = limit < 0 ? 0 : limit;


                var pageStores = _dbContext.Stores.AsNoTracking();


                switch (sortOrder)
                {
                    case "Name":
                        pageStores = pageStores.OrderBy(u => u.Name);
                        break;
                    case "Name_desc":
                        pageStores = pageStores.OrderByDescending(u => u.Name);
                        break;
                    case "Address":
                        pageStores = pageStores.OrderBy(u => u.Address);
                        break;
                    case "Address_desc":
                        pageStores = pageStores.OrderByDescending(u => u.Address);
                        break;
                    default:
                        pageStores = pageStores.OrderByDescending(u => u.Id);
                        break;
                }

                pageStores = pageStores.Skip(offset).Take(limit);

                return pageStores.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Stores GetById(int storeID)
        {
            try
            {
                return _dbContext.Stores.Find(storeID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int GetTotalStoreCount()
        {
            try
            {
                return _dbContext.Stores.Count();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Stores> GetAlldata()
        {
            try
            {
                return _dbContext.Stores.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert(Stores store)
        {
            try
            {
                var addStore = _dbContext.Stores.Add(store);
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Update(Stores store)
        {
            try
            {
                _dbContext.Entry(store).State = EntityState.Modified;
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(int storeID)
        {
            try
            {
                Stores store = _dbContext.Stores.Find(storeID);
                _dbContext.Stores.Remove(store);
                return Save();
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Save()
        {
            var result = _dbContext.SaveChanges();
            return result > 0 ? true : false;
        }
    }
}
