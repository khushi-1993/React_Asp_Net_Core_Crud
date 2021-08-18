using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using Microsoft.EntityFrameworkCore;

namespace React_Asp_Net_Core_Crud.DAL.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ICMVCContext _dbContext;
        public ProductRepository()
        {
            _dbContext = new ICMVCContext();
        }

        public ProductRepository(ICMVCContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Products> GetAll(int offset, int limit, string sortOrder)
        {
                try
                {
                    offset = offset < 0 ? 0 : offset;
                    limit = limit < 0 ? 0 : limit;


                    var pageProducts = _dbContext.Products.AsNoTracking();


                    switch (sortOrder)
                    {
                        case "Name":
                            pageProducts = pageProducts.OrderBy(u => u.Name);
                            break;
                        case "Name_desc":
                            pageProducts = pageProducts.OrderByDescending(u => u.Name);
                            break;
                        case "Price":
                            pageProducts = pageProducts.OrderBy(u => u.Price);
                            break;
                        case "Price_desc":
                            pageProducts = pageProducts.OrderByDescending(u => u.Price);
                            break;
                        default:
                            pageProducts = pageProducts.OrderByDescending(u => u.Id);
                            break;
                    }

                    pageProducts = pageProducts.Skip(offset).Take(limit);

                    return pageProducts.ToList();
                }
                catch (Exception)
                {
                    throw;
                }
        }

        public Products GetById(int productID)
        {
            try
            {
                return _dbContext.Products.Find(productID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int GetTotalProductCount()
        {
            try
            {
                return _dbContext.Products.Count();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Products> GetAlldata()
        {
            try
            {
                return _dbContext.Products.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert(Products product)
        {
            try
            {
                var addProduct = _dbContext.Products.Add(product);
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Update(Products product)
        {
            try
            {
                _dbContext.Entry(product).State = EntityState.Modified;
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(int productID)
        {
            try
            {
                Products product = _dbContext.Products.Find(productID);
                _dbContext.Products.Remove(product);
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
