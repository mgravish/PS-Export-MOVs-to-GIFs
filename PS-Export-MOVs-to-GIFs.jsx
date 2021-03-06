var myScale = 50;
var mRL = 239;
var mGL = 238;
var mBL = 241;
var mRD = 11;
var mGD = 8;
var mBD = 19;
var f, fL, fD, movFolder;
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

selectFolder();

alert("The cheermote export has finished!");

/*   Functions     */
function selectFolder() {
    movFolder = Folder.selectDialog("Select a folder...");
    if(movFolder != null){
        createFolderStructure();
        var myMOVFiles = movFolder.getFiles("*.mov");
        var myPNGFiles = movFolder.getFiles("*.png");
        for (var i = 0; i < myMOVFiles.length; i++) 
        {
            //$.writeln ("File "+(i+1)+" name="+myMOVFiles[i].name )
            doPSActionAnimated(myMOVFiles[i]);
        }
        for (var i = 0; i < myPNGFiles.length; i++) 
        {
            doPSActionStatic(myPNGFiles[i]);
        }
    }
    else
        return;
}

function doPSActionAnimated(input) {
   #target photoshop
    app.open(input);
    //$.writeln ("PSAction Input Name Split = "+decodeURI(input.name).split(" ")[1].split(".")[0]);
    exportLightCheermote(decodeURI(input.name).split(" ")[1].split(".")[0]);
    exportDarkCheermote(decodeURI(input.name).split(" ")[1].split(".")[0]);
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function doPSActionStatic(input) {
   #target photoshop
    app.open(input);
    exportLightStaticCheermote(decodeURI(input.name).split(" ")[1].split(".")[0]);
    exportDarkStaticCheermote(decodeURI(input.name).split(" ")[1].split(".")[0]);
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function exportLightCheermote(tier) {
    var dest = fL+"/animated/"+tier+"/";
    exportCheermotev2(100, mRL, mGL, mBL, "4.gif", dest);
    exportCheermotev2(75, mRL, mGL, mBL, "3.gif", dest);
    exportCheermotev2(50, mRL, mGL, mBL, "2.gif", dest);
    exportCheermotev2(37.5, mRL, mGL, mBL, "1.5.gif", dest);
    exportCheermotev2(25, mRL, mGL, mBL, "1.gif", dest);
}

function exportDarkCheermote(tier) {
    var dest = fD+"/animated/"+tier+"/";
    exportCheermotev2(100, mRD, mGD, mBD, "4.gif", dest);
    exportCheermotev2(75, mRD, mGD, mBD, "3.gif", dest);
    exportCheermotev2(50, mRD, mGD, mBD, "2.gif", dest);
    exportCheermotev2(37.5, mRD, mGD, mBD, "1.5.gif", dest);
    exportCheermotev2(25, mRD, mGD, mBD, "1.gif", dest);
}

function exportLightStaticCheermote(tier) {
    var dest = fL+"/static/"+tier+"/";
    exportCheermoteStatic(100, "4.png", dest);
    exportCheermoteStatic(75, "3.png",dest);
    exportCheermoteStatic(50, "2.png",dest);
    exportCheermoteStatic(37.5, "1.5.png",dest);
    exportCheermoteStatic(25, "1.png",dest);
}

function exportDarkStaticCheermote(tier) {
    var dest = fD+"/static/"+tier+"/";
    exportCheermoteStatic(100, "4.png", dest);
    exportCheermoteStatic(75, "3.png",dest);
    exportCheermoteStatic(50, "2.png",dest);
    exportCheermoteStatic(37.5, "1.5.png",dest);
    exportCheermoteStatic(25, "1.png",dest);
}
function createFolderStructure() {
    f = new Folder("~/Desktop/"+movFolder.name.toLowerCase());
        if (!f.exists)
            f.create();
    fL= new Folder(f+"/light");
        if (!fL.exists)
                fL.create();
    fD= new Folder(f+"/dark");
        if (!fD.exists)
                fD.create();

    createSubFolders(fL);
    createSubFolders(fD);
}

function createSubFolders(rootFolder) {
    var fA= new Folder(rootFolder+"/animated");
        if (!fA.exists){
                fA.create();
                tierThreeFolders(fA);
        }
    var fS= new Folder(rootFolder+"/static");
        if (!fS.exists){
                fS.create();
                tierThreeFolders(fS);
        }
}

function tierThreeFolders(rootFolder) {
    var f1= new Folder(rootFolder+"/1");
        if (!f1.exists)
                f1.create();
    var f100= new Folder(rootFolder+"/100");
        if (!f100.exists)
                f100.create();
    var f1000= new Folder(rootFolder+"/1000");
        if (!f1000.exists)
                f1000.create();
    var f5000= new Folder(rootFolder+"/5000");
        if (!f5000.exists)
                f5000.create();
    var f10000= new Folder(rootFolder+"/10000");
        if (!f10000.exists)
                f10000.create();
}

function exportCheermotev2( scl, mtR, mtG, mtB, fN, fldr ) {
   //$.writeln("Trying export:\nScale="+scl+"\nmtR="+mtR+"\nmtG="+mtG+"\nmtB="+mtB+"\nfldr="+fldr+"\nfN="+fN);
  // Export
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(cTID('Op  '), cTID('SWOp'), cTID('OpSa'));
    desc2.putBoolean(cTID('DIDr'), true);
    desc2.putPath(cTID('In  '), new File(fldr));
    desc2.putString(cTID('ovFN'), fN );
    desc2.putEnumerated(cTID('Fmt '), cTID('IRFm'), cTID('GIFf'));
    desc2.putBoolean(cTID('Intr'), false);
    desc2.putEnumerated(cTID('RedA'), cTID('IRRd'), cTID('Prcp'));
    desc2.putBoolean(cTID('RChT'), false);
    desc2.putBoolean(cTID('RChV'), false);
    desc2.putBoolean(cTID('AuRd'), false);
    desc2.putInteger(cTID('NCol'), 256);
    desc2.putInteger(cTID('DChS'), 0);
    desc2.putInteger(cTID('DCUI'), 0);
    desc2.putBoolean(cTID('DChT'), false);
    desc2.putBoolean(cTID('DChV'), false);
    desc2.putInteger(cTID('WebS'), 0);
    desc2.putEnumerated(cTID('TDth'), cTID('IRDt'), cTID('None'));
    desc2.putInteger(cTID('TDtA'), 100);
    desc2.putInteger(cTID('Loss'), 0);
    desc2.putInteger(cTID('LChS'), 0);
    desc2.putInteger(cTID('LCUI'), 100);
    desc2.putBoolean(cTID('LChT'), false);
    desc2.putBoolean(cTID('LChV'), false);
    desc2.putBoolean(cTID('Trns'), true);
    desc2.putBoolean(cTID('Mtt '), true);
    desc2.putEnumerated(cTID('Dthr'), cTID('IRDt'), cTID('Dfsn'));
    desc2.putInteger(cTID('DthA'), 100);
    desc2.putInteger(cTID('MttR'), mtR);
    desc2.putInteger(cTID('MttG'), mtG);
    desc2.putInteger(cTID('MttB'), mtB);
    desc2.putUnitDouble(cTID('HScl'), cTID('#Prc'), scl);
    desc2.putUnitDouble(cTID('VScl'), cTID('#Prc'), scl);
    desc2.putBoolean(cTID('SHTM'), false);
    desc2.putBoolean(cTID('SImg'), true);
    desc2.putEnumerated(cTID('SWsl'), cTID('STsl'), cTID('SLAl'));
    desc2.putEnumerated(cTID('SWch'), cTID('STch'), cTID('CHsR'));
    desc2.putEnumerated(cTID('SWmd'), cTID('STmd'), cTID('MDCC'));
    desc2.putBoolean(cTID('ohXH'), false);
    desc2.putBoolean(cTID('ohIC'), true);
    desc2.putBoolean(cTID('ohAA'), true);
    desc2.putBoolean(cTID('ohQA'), true);
    desc2.putBoolean(cTID('ohCA'), false);
    desc2.putBoolean(cTID('ohIZ'), true);
    desc2.putEnumerated(cTID('ohTC'), cTID('SToc'), cTID('OC03'));
    desc2.putEnumerated(cTID('ohAC'), cTID('SToc'), cTID('OC03'));
    desc2.putInteger(cTID('ohIn'), -1);
    desc2.putEnumerated(cTID('ohLE'), cTID('STle'), cTID('LE03'));
    desc2.putEnumerated(cTID('ohEn'), cTID('STen'), cTID('EN00'));
    desc2.putBoolean(cTID('olCS'), false);
    desc2.putEnumerated(cTID('olEC'), cTID('STst'), cTID('ST00'));
    desc2.putEnumerated(cTID('olWH'), cTID('STwh'), cTID('WH01'));
    desc2.putEnumerated(cTID('olSV'), cTID('STsp'), cTID('SP04'));
    desc2.putEnumerated(cTID('olSH'), cTID('STsp'), cTID('SP04'));
    var list1 = new ActionList();
    var desc3 = new ActionDescriptor();
    desc3.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC00'));
    list1.putObject(cTID('SCnc'), desc3);
    var desc4 = new ActionDescriptor();
    desc4.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
    list1.putObject(cTID('SCnc'), desc4);
    var desc5 = new ActionDescriptor();
    desc5.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC28'));
    list1.putObject(cTID('SCnc'), desc5);
    var desc6 = new ActionDescriptor();
    desc6.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
    list1.putObject(cTID('SCnc'), desc6);
    var desc7 = new ActionDescriptor();
    desc7.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
    list1.putObject(cTID('SCnc'), desc7);
    var desc8 = new ActionDescriptor();
    desc8.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
    list1.putObject(cTID('SCnc'), desc8);
    desc2.putList(cTID('olNC'), list1);
    desc2.putBoolean(cTID('obIA'), false);
    desc2.putString(cTID('obIP'), "");
    desc2.putEnumerated(cTID('obCS'), cTID('STcs'), cTID('CS01'));
    var list2 = new ActionList();
    var desc9 = new ActionDescriptor();
    desc9.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC01'));
    list2.putObject(cTID('SCnc'), desc9);
    var desc10 = new ActionDescriptor();
    desc10.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC20'));
    list2.putObject(cTID('SCnc'), desc10);
    var desc11 = new ActionDescriptor();
    desc11.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC02'));
    list2.putObject(cTID('SCnc'), desc11);
    var desc12 = new ActionDescriptor();
    desc12.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
    list2.putObject(cTID('SCnc'), desc12);
    var desc13 = new ActionDescriptor();
    desc13.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC06'));
    list2.putObject(cTID('SCnc'), desc13);
    var desc14 = new ActionDescriptor();
    desc14.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
    list2.putObject(cTID('SCnc'), desc14);
    var desc15 = new ActionDescriptor();
    desc15.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
    list2.putObject(cTID('SCnc'), desc15);
    var desc16 = new ActionDescriptor();
    desc16.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
    list2.putObject(cTID('SCnc'), desc16);
    var desc17 = new ActionDescriptor();
    desc17.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC22'));
    list2.putObject(cTID('SCnc'), desc17);
    desc2.putList(cTID('ovNC'), list2);
    desc2.putBoolean(cTID('ovCM'), false);
    desc2.putBoolean(cTID('ovCW'), false);
    desc2.putBoolean(cTID('ovCU'), true);
    desc2.putBoolean(cTID('ovSF'), true);
    desc2.putBoolean(cTID('ovCB'), true);
    desc2.putString(cTID('ovSN'), "images");
    desc1.putObject(cTID('Usng'), sTID("SaveForWeb"), desc2);
    executeAction(cTID('Expr'), desc1, dialogMode);
  };

  step1();      // Export
}

function exportCheermoteStatic(scale, fN, fldr) {
    var idExpr = charIDToTypeID( "Expr" );
        var desc75 = new ActionDescriptor();
        var idUsng = charIDToTypeID( "Usng" );
            var desc76 = new ActionDescriptor();
            var idOp = charIDToTypeID( "Op  " );
            var idSWOp = charIDToTypeID( "SWOp" );
            var idOpSa = charIDToTypeID( "OpSa" );
            desc76.putEnumerated( idOp, idSWOp, idOpSa );
            var idDIDr = charIDToTypeID( "DIDr" );
            desc76.putBoolean( idDIDr, true );
            var idIn = charIDToTypeID( "In  " );
            desc76.putPath( idIn, new File( fldr ) );
            var idovFN = charIDToTypeID( "ovFN" );
            desc76.putString( idovFN, fN );
            var idFmt = charIDToTypeID( "Fmt " );
            var idIRFm = charIDToTypeID( "IRFm" );
            var idPNtwofour = charIDToTypeID( "PN24" );
            desc76.putEnumerated( idFmt, idIRFm, idPNtwofour );
            var idIntr = charIDToTypeID( "Intr" );
            desc76.putBoolean( idIntr, false );
            var idTrns = charIDToTypeID( "Trns" );
            desc76.putBoolean( idTrns, true );
            var idMtt = charIDToTypeID( "Mtt " );
            desc76.putBoolean( idMtt, true );
            var idEICC = charIDToTypeID( "EICC" );
            desc76.putBoolean( idEICC, false );
            var idMttR = charIDToTypeID( "MttR" );
            desc76.putInteger( idMttR, 0 );
            var idMttG = charIDToTypeID( "MttG" );
            desc76.putInteger( idMttG, 0 );
            var idMttB = charIDToTypeID( "MttB" );
            desc76.putInteger( idMttB, 0 );
            var idHScl = charIDToTypeID( "HScl" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc76.putUnitDouble( idHScl, idPrc, scale );
            var idVScl = charIDToTypeID( "VScl" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc76.putUnitDouble( idVScl, idPrc, scale );
            var idSHTM = charIDToTypeID( "SHTM" );
            desc76.putBoolean( idSHTM, false );
            var idSImg = charIDToTypeID( "SImg" );
            desc76.putBoolean( idSImg, true );
            var idSWsl = charIDToTypeID( "SWsl" );
            var idSTsl = charIDToTypeID( "STsl" );
            var idSLAl = charIDToTypeID( "SLAl" );
            desc76.putEnumerated( idSWsl, idSTsl, idSLAl );
            var idSWch = charIDToTypeID( "SWch" );
            var idSTch = charIDToTypeID( "STch" );
            var idCHsR = charIDToTypeID( "CHsR" );
            desc76.putEnumerated( idSWch, idSTch, idCHsR );
            var idSWmd = charIDToTypeID( "SWmd" );
            var idSTmd = charIDToTypeID( "STmd" );
            var idMDCC = charIDToTypeID( "MDCC" );
            desc76.putEnumerated( idSWmd, idSTmd, idMDCC );
            var idohXH = charIDToTypeID( "ohXH" );
            desc76.putBoolean( idohXH, false );
            var idohIC = charIDToTypeID( "ohIC" );
            desc76.putBoolean( idohIC, true );
            var idohAA = charIDToTypeID( "ohAA" );
            desc76.putBoolean( idohAA, true );
            var idohQA = charIDToTypeID( "ohQA" );
            desc76.putBoolean( idohQA, true );
            var idohCA = charIDToTypeID( "ohCA" );
            desc76.putBoolean( idohCA, false );
            var idohIZ = charIDToTypeID( "ohIZ" );
            desc76.putBoolean( idohIZ, true );
            var idohTC = charIDToTypeID( "ohTC" );
            var idSToc = charIDToTypeID( "SToc" );
            var idOCzerothree = charIDToTypeID( "OC03" );
            desc76.putEnumerated( idohTC, idSToc, idOCzerothree );
            var idohAC = charIDToTypeID( "ohAC" );
            var idSToc = charIDToTypeID( "SToc" );
            var idOCzerothree = charIDToTypeID( "OC03" );
            desc76.putEnumerated( idohAC, idSToc, idOCzerothree );
            var idohIn = charIDToTypeID( "ohIn" );
            desc76.putInteger( idohIn, -1 );
            var idohLE = charIDToTypeID( "ohLE" );
            var idSTle = charIDToTypeID( "STle" );
            var idLEzerothree = charIDToTypeID( "LE03" );
            desc76.putEnumerated( idohLE, idSTle, idLEzerothree );
            var idohEn = charIDToTypeID( "ohEn" );
            var idSTen = charIDToTypeID( "STen" );
            var idENzerozero = charIDToTypeID( "EN00" );
            desc76.putEnumerated( idohEn, idSTen, idENzerozero );
            var idolCS = charIDToTypeID( "olCS" );
            desc76.putBoolean( idolCS, false );
            var idolEC = charIDToTypeID( "olEC" );
            var idSTst = charIDToTypeID( "STst" );
            var idSTzerozero = charIDToTypeID( "ST00" );
            desc76.putEnumerated( idolEC, idSTst, idSTzerozero );
            var idolWH = charIDToTypeID( "olWH" );
            var idSTwh = charIDToTypeID( "STwh" );
            var idWHzeroone = charIDToTypeID( "WH01" );
            desc76.putEnumerated( idolWH, idSTwh, idWHzeroone );
            var idolSV = charIDToTypeID( "olSV" );
            var idSTsp = charIDToTypeID( "STsp" );
            var idSPzerofour = charIDToTypeID( "SP04" );
            desc76.putEnumerated( idolSV, idSTsp, idSPzerofour );
            var idolSH = charIDToTypeID( "olSH" );
            var idSTsp = charIDToTypeID( "STsp" );
            var idSPzerofour = charIDToTypeID( "SP04" );
            desc76.putEnumerated( idolSH, idSTsp, idSPzerofour );
            var idolNC = charIDToTypeID( "olNC" );
                var list1 = new ActionList();
                    var desc77 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCzerozero = charIDToTypeID( "NC00" );
                    desc77.putEnumerated( idncTp, idSTnc, idNCzerozero );
                var idSCnc = charIDToTypeID( "SCnc" );
                list1.putObject( idSCnc, desc77 );
                    var desc78 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNConenine = charIDToTypeID( "NC19" );
                    desc78.putEnumerated( idncTp, idSTnc, idNConenine );
                var idSCnc = charIDToTypeID( "SCnc" );
                list1.putObject( idSCnc, desc78 );
                    var desc79 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwoeight = charIDToTypeID( "NC28" );
                    desc79.putEnumerated( idncTp, idSTnc, idNCtwoeight );
                var idSCnc = charIDToTypeID( "SCnc" );
                list1.putObject( idSCnc, desc79 );
                    var desc80 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwofour = charIDToTypeID( "NC24" );
                    desc80.putEnumerated( idncTp, idSTnc, idNCtwofour );
                var idSCnc = charIDToTypeID( "SCnc" );
                list1.putObject( idSCnc, desc80 );
                    var desc81 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwofour = charIDToTypeID( "NC24" );
                    desc81.putEnumerated( idncTp, idSTnc, idNCtwofour );
                var idSCnc = charIDToTypeID( "SCnc" );
                list1.putObject( idSCnc, desc81 );
                    var desc82 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwofour = charIDToTypeID( "NC24" );
                    desc82.putEnumerated( idncTp, idSTnc, idNCtwofour );
                var idSCnc = charIDToTypeID( "SCnc" );
                list1.putObject( idSCnc, desc82 );
            desc76.putList( idolNC, list1 );
            var idobIA = charIDToTypeID( "obIA" );
            desc76.putBoolean( idobIA, false );
            var idobIP = charIDToTypeID( "obIP" );
            desc76.putString( idobIP, """""" );
            var idobCS = charIDToTypeID( "obCS" );
            var idSTcs = charIDToTypeID( "STcs" );
            var idCSzeroone = charIDToTypeID( "CS01" );
            desc76.putEnumerated( idobCS, idSTcs, idCSzeroone );
            var idovNC = charIDToTypeID( "ovNC" );
                var list2 = new ActionList();
                    var desc83 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCzeroone = charIDToTypeID( "NC01" );
                    desc83.putEnumerated( idncTp, idSTnc, idNCzeroone );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc83 );
                    var desc84 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwozero = charIDToTypeID( "NC20" );
                    desc84.putEnumerated( idncTp, idSTnc, idNCtwozero );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc84 );
                    var desc85 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCzerotwo = charIDToTypeID( "NC02" );
                    desc85.putEnumerated( idncTp, idSTnc, idNCzerotwo );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc85 );
                    var desc86 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNConenine = charIDToTypeID( "NC19" );
                    desc86.putEnumerated( idncTp, idSTnc, idNConenine );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc86 );
                    var desc87 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCzerosix = charIDToTypeID( "NC06" );
                    desc87.putEnumerated( idncTp, idSTnc, idNCzerosix );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc87 );
                    var desc88 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwofour = charIDToTypeID( "NC24" );
                    desc88.putEnumerated( idncTp, idSTnc, idNCtwofour );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc88 );
                    var desc89 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwofour = charIDToTypeID( "NC24" );
                    desc89.putEnumerated( idncTp, idSTnc, idNCtwofour );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc89 );
                    var desc90 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwofour = charIDToTypeID( "NC24" );
                    desc90.putEnumerated( idncTp, idSTnc, idNCtwofour );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc90 );
                    var desc91 = new ActionDescriptor();
                    var idncTp = charIDToTypeID( "ncTp" );
                    var idSTnc = charIDToTypeID( "STnc" );
                    var idNCtwotwo = charIDToTypeID( "NC22" );
                    desc91.putEnumerated( idncTp, idSTnc, idNCtwotwo );
                var idSCnc = charIDToTypeID( "SCnc" );
                list2.putObject( idSCnc, desc91 );
            desc76.putList( idovNC, list2 );
            var idovCM = charIDToTypeID( "ovCM" );
            desc76.putBoolean( idovCM, false );
            var idovCW = charIDToTypeID( "ovCW" );
            desc76.putBoolean( idovCW, false );
            var idovCU = charIDToTypeID( "ovCU" );
            desc76.putBoolean( idovCU, true );
            var idovSF = charIDToTypeID( "ovSF" );
            desc76.putBoolean( idovSF, true );
            var idovCB = charIDToTypeID( "ovCB" );
            desc76.putBoolean( idovCB, true );
            var idovSN = charIDToTypeID( "ovSN" );
            desc76.putString( idovSN, """images""" );
        var idSaveForWeb = stringIDToTypeID( "SaveForWeb" );
        desc75.putObject( idUsng, idSaveForWeb, desc76 );
    executeAction( idExpr, desc75, DialogModes.NO );
}
