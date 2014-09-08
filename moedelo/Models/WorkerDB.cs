using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Dapper;

namespace moedelo.Models
{
    public class WorkerDB
    {
        public string Connectionstring = @"Data Source=localhost;Initial Catalog=moedelo;Integrated Security=True";
        public IEnumerable<Worker> GetWorkers(int usersID = 0)
        {
            System.Data.SqlClient.SqlConnection sqlConnection = new System.Data.SqlClient.SqlConnection(Connectionstring);
            
            sqlConnection.Open();
            var worker = sqlConnection.Query<Worker>("dbo.spUsersGet "+usersID.ToString());
            sqlConnection.Close();
            return worker;

            
        }

        public int UpdateOrInsertWorker(Worker worker)
        {
            System.Data.SqlClient.SqlConnection sqlConnection = new System.Data.SqlClient.SqlConnection(Connectionstring);
            String sql = worker.usersID > 0 ? "dbo.spUsersUpdateBase" : "dbo.spUsersInsertBase";

            DynamicParameters dp = new DynamicParameters();
            dp.Add(
                "nUsersID", 
                worker.usersID,
                System.Data.DbType.Int32, 
                worker.usersID > 0 ? System.Data.ParameterDirection.Input : System.Data.ParameterDirection.Output
                );

            dp.Add(
                "cName",
                worker.cName,
                System.Data.DbType.String,
                System.Data.ParameterDirection.Input,
                80
                );

            dp.Add(
                "cEmail",
                worker.cEmail,
                System.Data.DbType.String,
                System.Data.ParameterDirection.Input,
                100
                );

            dp.Add(
                "ySalary",
                worker.ySalary,
                System.Data.DbType.Decimal,
                System.Data.ParameterDirection.Input
                );
            var retResults = SqlMapper.Execute(sqlConnection, sql, dp, commandType: CommandType.StoredProcedure);
            worker.usersID = dp.Get<int>("nUsersID");
            if (sqlConnection.State == ConnectionState.Open)
                sqlConnection.Close();
            return worker.usersID;
        }

        public void DeleteWorker(int nUsersID)
        {
            System.Data.SqlClient.SqlConnection sqlConnection = new System.Data.SqlClient.SqlConnection(Connectionstring);
            String sql = "dbo.spUsersDeleteBase";

            DynamicParameters dp = new DynamicParameters();
            dp.Add(
                "nUsersID",
                nUsersID,
                System.Data.DbType.Int32,
                System.Data.ParameterDirection.Input
                );
            var retResults = SqlMapper.Execute(sqlConnection, sql, dp, commandType: CommandType.StoredProcedure);
            if (sqlConnection.State == ConnectionState.Open)
                sqlConnection.Close();
        }
    }
}