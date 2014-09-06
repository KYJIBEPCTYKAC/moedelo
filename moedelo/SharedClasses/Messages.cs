using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

namespace moedelo.SharedClasses
{
    public class Messages
    {
        private static Messages singleton = null;
        private Messages(String cultureInfo)
        {
            if (cultureInfo == "ru-RU")
            {
                this.msgAdd = "Добавить";
                this.msgRefresh = "Обновить";
                this.msgDelete = "Удалить";
                this.msgEdit = "Редактировать";
                this.msgName = "ФИО";
                this.msgEmail = "E-mail";
                this.msgSalary = "Зарплата";
            }
        }

        public String msgAdd { get; private set; }
        public String msgRefresh { get; private set; }
        public String msgDelete { get; private set; }
        public String msgEdit { get; private set; }
        public String msgName { get; private set; }
        public String msgEmail { get; private set; }
        public String msgSalary { get; private set; }

        public static Messages getMessages(String cultureInfo = ""){
            if (cultureInfo.Length == 0)
                cultureInfo = CultureInfo.CurrentCulture.Name;
            if (singleton ==null)
                singleton = new Messages(cultureInfo);
            
            return singleton;
        }

    }
}