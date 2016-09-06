/**
 *
 */
function ConfigModal( attrs ) {
    
    var self = this;
    
    this.element = document.createElement('div')
    this.element.classList.add('modal');
    
    this.content = document.createElement('div');
    this.content.classList.add('modal-content');
    
    this.header = document.createElement('div');
    this.header.classList.add('modal-header-1');
    
    this.heading = document.createElement('h2');
    this.heading.textContent = attrs.heading;
    
    this.body = document.createElement('div');
    this.body.classList.add('modal-body');
    
    this.footer = document.createElement('div');
    this.footer.classList.add('modal-footer-1');
    
    this.footer_buttons = document.createElement('div');
    this.footer_buttons.classList.add('sidebyside');
    
    
    
    attrs.headerButtons.forEach(function(button) {
        self.header.appendChild( button );
    });
    this.header.appendChild( this.heading );
            
}

        //<div id="configModal" class="modal">
        //  <!-- Modal content -->
        //  <div class="modal-content">
        //    <div class="modal-header-1">
        //      <span id="config_close" class="close">×</span>
        //      <span id="soft_reset" class="close" onclick="softReset()">&#8634;</span>
        //      <h2>Settings</h2>
        //    </div>
        //    <div id="settings_body" class="modal-body"></div>
        //    <div class="modal-footer-1">
        //        <div class="sidebyside">
        //            <div class="user_yes-1 left pop_out" onclick="applySettings()">APPLY</div>
        //            &nbsp;&nbsp;
        //            <div class="user_no-1 right pop_out" onclick="closeConfigModal()">CANCEL</div>
        //        </div>
        //    </div>
        //  </div>
        //</div>