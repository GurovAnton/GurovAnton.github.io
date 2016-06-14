require(
    [
        'list',
        'app',
        'edit',
        'del'
    ],
    function(list, app, edit, del) {
        $(function() {

            elements.listLink.on('click', list.showList);
            elements.btnDelCompany.on('click', del.deleteComp);
            elements.clearLink.on('click', del.clearAll);
            elements.btnCreateItem.on('click', list.showModal);
            elements.btnAddCompany.on('click', list.newCompany);
            elements.itemCont.delegate('tr', 'click', list.showModal);
            elements.selectCont.on('change', list.showList);
            
        });




    }
);
