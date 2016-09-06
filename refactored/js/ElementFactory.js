/**
 * Element Factory
 *
 *  'toggle', {
 *      label   : 'myLabel,
 *      handler : function() { console.log('handler'); },
 *      name    : 'myName'
 *  }
 *
 *  'select', {
 *      label   : 'myLabel'
 *      handler : function() { console.log('handler'); },
 *      name:   : 'myName',
 *      options : {
 *          O1: {
 *              name    : 'myName',
 *              value   : 'myValue'
 *          }
 *      }
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