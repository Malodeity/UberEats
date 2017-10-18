using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using MySql.Web;

namespace UberEats.Models
{
    public class Users
    {
        public long id { get; set; }

        [Required(ErrorMessage = "firstname is required")]
        [Display(Name = "firstname")]
        public string firstname { get; set; }

        [Required(ErrorMessage = "lastname is required")]
        [Display(Name = "lastname")]
        public string lastname { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [Display(Name = "Email")]
        public string email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [Display(Name = "Password")]
        public string password { get; set; }

        public Users(int iD, string _email, string _password, string lName, string fName)
        {
            id = iD;
            firstname = fName;
            lastname = lName;
            email = _email;
            password = _password;
        }

    }
}