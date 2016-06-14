define(
    'edit', [],
    function() {
        var
            mainInput,
            adressInput,
            dataNumber,
            custNumber,
            updInfo = {},
            updAdress = {
                'adress': {}
            };
        self.getParam = function(e) {
            flag = getFlag();
            mainInput = $('.main_input');
            adressInput = $('.adress_input');
            for (var i = 0; i < mainInput.length; i++) {
                var k = mainInput[i].id;
                updInfo[k] = mainInput[i].value;
            }
            for (var j = 0; j < adressInput.length; j++) {
                var r = adressInput[j].id;
                updAdress.adress[r] = adressInput[j].value;
            }
            currentDB = getCompany();
            db = getDb(currentDB);
            if (!flag) {
                index = getIndex();
                updateInfo(index, updInfo, updAdress, db, currentDB);
            } else {
                var newObj = $.extend(updInfo, updAdress);

                db.customers.push(newObj);
                localStorage.setItem(currentDB, JSON.stringify(db));
            }
            main = getInfo(db.customers);
            adr = getAdress(db.customers);
            compileList(main, adr, elements.tmplItemList, elements.itemCont);
              
            hideModal();
            elements.table.show();
        };


        function updateInfo(index, updInfo, updAdress, db, currentDB) {
            db.customers[index].name = updInfo.name;
            db.customers[index].email = updInfo.email;
            db.customers[index].telephone = updInfo.telephone;
            db.customers[index].adress.city = updAdress.adress.city;
            db.customers[index].adress.street = updAdress.adress.street;
            db.customers[index].adress.state = updAdress.adress.state;
            db.customers[index].adress.zip = updAdress.adress.zip;
            localStorage.setItem(currentDB, JSON.stringify(db));

        }

    }

);
