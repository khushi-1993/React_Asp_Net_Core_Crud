using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using React_Asp_Net_Core_Crud.Models;

namespace React_Asp_Net_Core_Crud.DAL.IRepository
{
    public interface IStoreRepository
    {
        IEnumerable<Stores> GetAll(int offset, int limit, string sortOrder);
        Stores GetById(int storeID);
        int GetTotalStoreCount();
        IEnumerable<Stores> GetAlldata();
        bool Insert(Stores store);
        bool Update(Stores store);
        bool Delete(int storeID);
        bool Save();
    }
}
