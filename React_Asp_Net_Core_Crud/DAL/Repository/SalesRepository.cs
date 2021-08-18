using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using Microsoft.EntityFrameworkCore;


namespace React_Asp_Net_Core_Crud.DAL.Repository
{
    public class SalesRepository : ISalesRepository
    {
        private readonly ICMVCContext _dbContext;
        public SalesRepository()
        {
            _dbContext = new ICMVCContext();
        }

        public SalesRepository(ICMVCContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<SalesViewModel> GetAll(int offset, int limit, string sortOrder)
        {
            try
            {
                offset = offset < 0 ? 0 : offset;
                limit = limit < 0 ? 0 : limit;


                var pageSales = _dbContext.Sales.
                    Include(p => p.Product).
                    Include(c => c.Customer).
                    Include(s => s.Store).
                    Select(x => new SalesViewModel
                    {
                        Id = x.Id,
                        CustomerId = x.CustomerId,
                        ProductId = x.ProductId,
                        StoreId = x.StoreId,
                        CustomerName = x.Customer.Name,
                        ProductName = x.Product.Name,
                        StoreName = x.Store.Name,
                        DateSold =  x.DateSold
                    });


                switch (sortOrder)
                {
                    case "Product_Name":
                        pageSales = pageSales.OrderBy(u => u.ProductName);
                        break;
                    case "Product_Name_desc":
                        pageSales = pageSales.OrderByDescending(u => u.ProductName);
                        break;
                    case "Customer_Name":
                        pageSales = pageSales.OrderBy(u => u.CustomerName);
                        break;
                    case "Customer_Name_desc":
                        pageSales = pageSales.OrderByDescending(u => u.CustomerName);
                        break;
                    case "Store_Name":
                        pageSales = pageSales.OrderBy(u => u.StoreName);
                        break;
                    case "Store_Name_desc":
                        pageSales = pageSales.OrderByDescending(u => u.StoreName);
                        break;
                    case "DateSold":
                        pageSales = pageSales.OrderBy(u => u.DateSold);
                        break;
                    case "DateSold_desc":
                        pageSales = pageSales.OrderByDescending(u => u.DateSold);
                        break;
                    default:
                        pageSales = pageSales.OrderByDescending(u => u.Id);
                        break;
                }

                pageSales = pageSales.Skip(offset).Take(limit);

                return (IEnumerable<SalesViewModel>)pageSales.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Sales GetById(int salesID)
        {
            try
            {
                return _dbContext.Sales.Find(salesID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int GetTotalSaleCount()
        {
            try
            {
                return _dbContext.Sales.Count();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Sales> GetAlldata()
        {
            try
            {
                return _dbContext.Sales.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Insert(Sales sales)
        {
            try
            {
                var addSales = _dbContext.Sales.Add(sales);
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Update(Sales sales)
        {
            try
            {
                _dbContext.Entry(sales).State = EntityState.Modified;
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(int salesID)
        {
            try
            {
                Sales sales = _dbContext.Sales.Find(salesID);
                _dbContext.Sales.Remove(sales);
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
