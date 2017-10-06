/*

oolite-cloaking-device-equipment.js

Equipment script for cloaking device.


Oolite
Copyright © 2004-2013 Giles C Williams and contributors

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
MA 02110-1301, USA.

*/


/*jslint white: true, undef: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */
/*global worldScripts*/


"use strict";

this.name = "Cloaking Device";
this.author			= "cim, cag";
this.copyright		= "© 2008-2017 the Oolite team.";


this.activated = function activated()
{
        "use strict";
        var that = activated;
        var entitiesWithScanClass = (that.entitiesWithScanClass = that.entitiesWithScanClass
                                                                     || system.entitiesWithScanClass);
        var missilesTargetingPlayer = (that.missilesTargetingPlayer = that.missilesTargetingPlayer || []);
        
        var isCloaked, ps = player && player.ship;
        isCloaked = ps.isCloaked = !ps.isCloaked;
      
        if (isCloaked)
        {
            // find missiles targeting player
            var ent, scannerRange = ps.scannerRange;
            missilesTargetingPlayer.length = 0;
            missilesTargetingPlayer = entitiesWithScanClass( 'CLASS_MISSILE', ps, scannerRange );
            for( var i = 0, len = missilesTargetingPlayer.length; i < len; i++ ) 
            {
                ent = missilesTargetingPlayer[i];
                if( !ent.isValid ) continue;
                if( ent.target !== ps ) continue;
                ent.target = null;     // target lost -> missile detonates
            }
        }
}
