using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;

namespace React_Asp_Net_Core_Crud.DAL.IRepository
{
    public interface ISalesRepository
    {
        IEnumerable<Sales> GetAll(int offset, int limit, string sortOrder);
        Sales GetById(int salesID);
        int GetTotalSaleCount();
        IEnumerable<Sales> GetAlldata();
        bool Insert(Sales sales);
        bool Update(Sales sales);
        bool Delete(int salesID);
        bool Save();
    }
}
