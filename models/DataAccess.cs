using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data.Sql;



namespace UberEats.models
{
    public class DataAccess
    {
        public long User(long id, string firstanme)
        {

            using (SqlConnection connect = new SqlConnection("CustomerDbEntities1"))
            {
                using (SqlCommand comma = new SqlCommand())
                {
                    comma.Connection = connect;
                    try
                    {
                        comma.Connection.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Customer](firstname,lastname,email,password) VALUES(@firstname,@lastname,@email,@password)";
                        //comma.Parameters.AddWithValue("@Firstname", firstname);
                        //comma.Parameters.AddWithValue("@lastname", lastname);
                        //comma.Parameters.AddWithValue("@email", email);
                        //comma.Parameters.AddWithValue("@password", password);
                        comma.ExecuteNonQuery();
                    }
                    catch (SqlException)
                    {
                        throw;
                    }
                    finally
                    {
                        comma.Connection.Close();
                    }
                }
            }
            return id;
        }

        internal long User(LoginData id)
        {
            throw new NotImplementedException();
        }

        internal int User(Customer value)
        {
            throw new NotImplementedException();
        }


        public LoginData getUser(string email, string password)
        {
            LoginData use = null;
            string query = "SELECT email,password WHERE email=@email AND password=@password";


            using (SqlConnection connect = new SqlConnection("CustomerDbEntities1"))
            {
                using (SqlCommand comma = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Customer](email,password) VALUES(@email,@password)";
                        comma.Parameters.AddWithValue("@email", email);
                        comma.Parameters.AddWithValue("@password", password);
                        comma.ExecuteNonQuery();
                    }
                    catch
                    {
                        connect.Close();
                    }

            }

            return use;

        }
    }
}