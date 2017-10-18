using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace UberEats.models
{
    public class DriverLogIn
    {

        public long User(long DriverId, string DriverFName)
        {

            using (SqlConnection connect = new SqlConnection("CustomerDbEntities1"))
            {
                using (SqlCommand comma = new SqlCommand())
                {
                    comma.Connection = connect;
                    try
                    {
                        comma.Connection.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Driver](DriverFname,DriverLName,DriverEmail,DriverPassword,DriverCellNum) VALUES(@(DriverFname,@DriverLName,@DriverEmail,@DriverPassword,@DriverCellNum)";
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
            return DriverId;
        }

        internal long User(LoginData DriverId)
        {
            throw new NotImplementedException();
        }

        internal int User(Customer value)
        {
            throw new NotImplementedException();
        }


        public LoginData getUser(string DriverEmail, string DriverPassword)
        {
            LoginData use = null;
            string query = "SELECT DriverEmail,DriverPassword WHERE DriverEmail=@DriverEmail AND DriverPassword=@DriverPassword";


            using (SqlConnection connect = new SqlConnection("CustomerDbEntities1"))
            {
                using (SqlCommand comma = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Driver](DriverEmail,DriverPassword) VALUES(@DriverEmail,@DriverPassword)";
                        comma.Parameters.AddWithValue("@DriverEmail", DriverEmail);
                        comma.Parameters.AddWithValue("@DriverPassword", DriverPassword);
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
