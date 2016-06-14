define(
    'list', [],
    function() {

        var self = this,
            el,
            index,
            currentDB,
            db = {},
            id = [],
            flag;
        self.elements = {
            table: $('.table'),
            itemCont: $('.list'),
            selectCont: $('.selection'),
            overlay: $('.overlay'),
            listLink: $('.headmenu__link-list'),
            btnDelCompany: $('.btn-delcomp'),
            clearLink: $('.headmenu__link-clear'),
            btnCreateItem: $('.btn-create'),
            btnAddCompany: $('.btn-savecomp'),
            inputCompanyName: $('.new-company'),
            tmplItemList: $('#list-container'),
            tmplNameList: $('#option'),
            tmplModal: $('#info-container')
        };
        
        elements.btnCreateItem.hide();

        self.compileList = function(data, adr, el, container) {
            var tmpl = el.html();
            tmpl = _.template(tmpl);

            container.html(tmpl({
                list: data,
                adr: adr
            }));
        };

        self.newCompany = function() {
            var compName = elements.inputCompanyName.val();
            if (!compName) {
              return;
            }
            elements.btnCreateItem.show();
            //добавить метод модели!!!
            id = JSON.parse(localStorage.getItem('db')) ? JSON.parse(localStorage.getItem('db')) : [];
            id.push(compName);
            id = _.uniq(id);
            db.comp = compName;
            db.customers = [];
            localStorage.setItem('db', JSON.stringify(id));
            localStorage.setItem(compName, JSON.stringify(db));
            compileList(id, '', elements.tmplNameList, elements.selectCont);
            elements.inputCompanyName.val('');
            elements.selectCont.val(compName);
            compileList('', '', elements.tmplItemList, elements.itemCont);

        };

        self.getIndex = function() {
            return index;
        };

        self.getFlag = function() {
            return flag;
        };

        self.showList = function(e) {
            currentDB = getCompany();
            if (e.type !== 'change') {
                e.preventDefault();
                if (!elements.selectCont.val()) {
                    id = JSON.parse(localStorage.getItem('db')) ? JSON.parse(localStorage.getItem('db')) : [];
                    compileList(id, '', elements.tmplNameList, elements.selectCont);
                    if (!id.length) {
                        return;
                    }
                    elements.btnCreateItem.show();
                }
            }
            db = getDb(currentDB);
            info = getInfo(db.customers);
            adress = getAdress(db.customers);
            compileList(info, adress, elements.tmplItemList, elements.itemCont);

            if (info.length === 0) {
                return;
            }
            elements.table.show();
        };

        self.showModal = function(e) {
            var topPosition;
            index = $(this).index();
            elements.overlay.show();
            flag = $(e.toElement).hasClass('btn-create');

            if (!flag) {
                currentDB = getCompany();
                db = getDb(currentDB);
                info = getInfo(db.customers);
                adress = getAdress(db.customers);
                compileList(info[index], adress[index], elements.tmplModal, elements.overlay);
                topPosition = e.clientY;
            } else {
                compileList('', '', elements.tmplModal, elements.overlay);
                $('.btn-upd').html('Save');
                $('.btn-del').hide();

            }
            $('.modal_result').fadeIn(400);
            $('.modal_result').css('top', topPosition);
            $('.btn-cls').one('click', hideModal);
            $('.btn-upd').one('click', getParam);
            $('.btn-del').one('click', deleteItem);
        };

        self.hideModal = function() {
            $('.modal_result').fadeOut(300, function () {
              elements.overlay.hide();
            });

        };

        return {
            showList: showList,
            showModal: showModal,
            newCompany: newCompany
        };
    }
);
