define(
    'app', [],
    function() {

        var
            info = [],
            adress = [];
        self.getCompany = function() {
            currentDB = elements.selectCont.val();
            if (currentDB) {
              return currentDB;
            } else if(JSON.parse(localStorage.getItem('db'))) {
              return JSON.parse(localStorage.getItem('db'))[0];
            } else {
              return false;
            }

        };

        self.getDb = function(currentDB) {
            db = JSON.parse(localStorage.getItem(currentDB));
            return db;
        };

        self.getInfo = function(db) {
            info = [];
            _.forEach(db, function(value, key) {
                info[key] = _.pick(value, ['name', 'email', 'telephone']);

            });
            return info;
        };
        self.getAdress = function(db) {
            adress = [];
            _.forEach(db, function(value, key) {
                adress[key] = _.pick(value, 'adress');

            });
            return adress;
        };


    }

);
