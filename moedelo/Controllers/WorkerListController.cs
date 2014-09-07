using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using moedelo.Models;

namespace moedelo.App_Start
{
    public class WorkerListController : Controller
    {
        private WorkerDB workerdb = new WorkerDB();

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /WorkerList/GetList
        public ActionResult GetList(int usersID)
        {
            Thread.Sleep(1000);
            List<Worker> resultSet = (List<Worker>)workerdb.GetWorkers(usersID);
            return Json(resultSet, JsonRequestBehavior.AllowGet);
        }
        //
        // GET: /WorkerList/UpdateOrInsertItem
        public ActionResult UpdateOrInsertItem(String cName, String cEmail, decimal ySalary, int usersID)
        {
            Thread.Sleep(1000);
            int error = 0;
            String msg = "OK";
            int res = -1;
            try
            {
                res = workerdb.UpdateOrInsertWorker(new Worker
                {
                    usersID = usersID,
                    cName = cName,
                    cEmail = cEmail,
                    ySalary = ySalary
                });
            }
            catch (Exception e)
            {
                error = e.InnerException.HResult;
                msg = e.Message;
            }


            return Json(new { error = error, msg = msg, usersID = res }, JsonRequestBehavior.AllowGet);
        }


                //
        // GET: /WorkerList/DeleteItem
        public ActionResult DeleteItem(int usersID)
        {
            Thread.Sleep(1000);
            int error = 0;
            String msg = "OK";

            try
            {
                workerdb.DeleteWorker(usersID);
            }
            catch (Exception e)
            {
                error = e.HResult;
                msg = e.Message;
            }
            return Json(new { error = error, msg = msg }, JsonRequestBehavior.AllowGet);
        }

    }
}
