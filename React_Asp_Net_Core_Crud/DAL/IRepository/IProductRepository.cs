using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;

namespace React_Asp_Net_Core_Crud.DAL.IRepository
{
    public interface IProductRepository
    {
        IEnumerable<Products> GetAll(int offset, int limit, string sortOrder);
        Products GetById(int productID);
        int GetTotalProductCount();
        IEnumerable<Products> GetAlldata();
        bool Insert(Products product);
        bool Update(Products product);
        bool Delete(int productID);
        bool Save();
    }
}
