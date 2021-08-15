using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace React_Asp_Net_Core_Crud.Models
{
    public partial class SalesViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Product Name is required")]
        public int ProductId { get; set; }
        [Required(ErrorMessage = "Customer Name is required")]
        public int CustomerId { get; set; }
        [Required(ErrorMessage = "Store Name is required")]
        public int StoreId { get; set; }
        [Required(ErrorMessage = "Date is required")]
        public string ProductName { get; set; }
        public string CustomerName { get; set; }
        public string StoreName { get; set; }
        public DateTime? DateSold { get; set; }
    }
}
