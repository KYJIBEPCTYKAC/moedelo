using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace moedelo.App_Start
{
    public class WorkerListController : Controller
    {
        //
        // GET: /WorkerList/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /WorkerList/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /WorkerList/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /WorkerList/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /WorkerList/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /WorkerList/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /WorkerList/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /WorkerList/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
