using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace React_Asp_Net_Core_Crud.Models
{
    public partial class Sales
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        public int ProductId { get; set; }
        [Required(ErrorMessage = "Customer Name is required")]
        public int CustomerId { get; set; }
        [Required(ErrorMessage = "Store Name is required")]
        public int StoreId { get; set; }
        [Required(ErrorMessage = "Date is required")]
        public DateTime? DateSold { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Products Product { get; set; }
        public virtual Stores Store { get; set; }
    }
}
