using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;
using React_Asp_Net_Core_Crud.DAL.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace React_Asp_Net_Core_Crud.DAL
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ICMVCContext _dbContext;
        public CustomerRepository()
        {
            _dbContext = new ICMVCContext();
        }

        public CustomerRepository(ICMVCContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Customers> GetAlldata()
        {
            try
            {
                return _dbContext.Customers.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Customers> GetAll(int offset, int limit, string sortOrder)
        {
            try
            {

            offset = offset < 0 ? 0 : offset;
            limit = limit < 0 ? 0 : limit;


            var pageCustomers = _dbContext.Customers.AsNoTracking();


            switch (sortOrder)
            {
                case "Name":
                        pageCustomers = pageCustomers.OrderBy(u => u.Name);
                    break;
                case "Name_desc":
                        pageCustomers = pageCustomers.OrderByDescending(u => u.Name);
                    break;
                case "Address":
                        pageCustomers = pageCustomers.OrderBy(u => u.Address);
                    break;
                case "Address_desc":
                        pageCustomers = pageCustomers.OrderByDescending(u => u.Address);
                    break;
                default:
                        pageCustomers = pageCustomers.OrderByDescending(u => u.Id);
                    break;
            }

                pageCustomers = pageCustomers.Skip(offset).Take(limit);

            return  pageCustomers.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Customers GetById(int customerID)
        {
            try
            {
                return _dbContext.Customers.Find(customerID);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public int GetTotalCustomerCount()
        {
            try
            {
                return _dbContext.Customers.Count();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public  bool Insert(Customers customer)
        {
            try
            {
                var addCustomer =  _dbContext.Customers.Add(customer);
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool Update(Customers customer)
        {
            try
            {
                _dbContext.Entry(customer).State = EntityState.Modified;
                return Save();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(int customerID)
        {
            try
            {
                Customers customer = _dbContext.Customers.Find(customerID);
                _dbContext.Customers.Remove(customer);
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
