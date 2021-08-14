using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;

namespace React_Asp_Net_Core_Crud.DAL.IRepository
{
    public interface ICustomerRepository
    {
        IEnumerable<Customers> GetAll(int offset, int limit, string sortOrder);
        Customers GetById(int customerID);
        int GetTotalCustomerCount();
        IEnumerable<Customers> GetAlldata();
        bool Insert(Customers customer);
        bool Update(Customers customer);
        bool Delete(int customerID);
        bool Save();

    }
}
