define(
    'del', [],
    function() {

        self.deleteItem = function(e) {
            flag = getFlag();
            if (!flag) {
                index = getIndex();
                currentDB = getCompany();
                db = getDb(currentDB);
                db.customers.splice(index, 1);
                localStorage.setItem(currentDB, JSON.stringify(db));
                main = getInfo(db.customers);
                adr = getAdress(db.customers);
                compileList(main, adr, elements.tmplItemList, elements.itemCont);

            }
            hideModal();
            if (db.length === 0) {
                elements.table.hide();
            }
        };

        self.deleteComp = function(e) {
            e.preventDefault();
            var ind,
                newList;
            currentDB = getCompany();
            localStorage.removeItem(currentDB);
            id = JSON.parse(localStorage.getItem('db')) ? JSON.parse(localStorage.getItem('db')) : [];
            ind = id.indexOf(currentDB);
            id.splice(ind, 1);
            localStorage.setItem('db', JSON.stringify(id));
            if (!id.length) {
                localStorage.removeItem('db');
                elements.table.hide();
                elements.btnCreateItem.hide();
            }
            compileList(id, '', elements.tmplNameList, elements.selectCont);

            currentDB = getCompany();
            if (currentDB) {
                db = getDb(currentDB);
                main = getInfo(db.customers);
                adr = getAdress(db.customers);
                compileList(main, adr, elements.tmplItemList, elements.itemCont);
            } else {
                elements.table.hide();
            }
        };

        self.clearAll = function() {
            localStorage.clear();
        };

        return {
            deleteItem: deleteItem,
            deleteComp: deleteComp,
            clearAll: clearAll
        };
    }
);
