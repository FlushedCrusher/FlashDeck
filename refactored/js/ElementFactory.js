/**
 * Element Factory
 *
 *  'toggle', { 
 *      id      : 'myId',
 *      handler : function() { console.log('handler'); },
 *      value   : 'myValue',
 *      text   : 'myText'
 *  }
 *
 *  'select', { 
 *      id      : 'myId',
 *      label   : 'myLabel'
 *      handler : function() { console.log('handler'); },
 *      sId     : 'mySID',
 *      name:   : 'myName',
 *      options : {}
 *  }
*/
function ElementFactory( type, attrs ) {
    var self;
    switch (type) {
        case 'toggle':
            self = new Toggle( attrs );
            break;
        case 'select':
            self = new Select( attrs );
            break;
        default:
            console.error('Error creating element.');
            break;
    }
    return self;
}