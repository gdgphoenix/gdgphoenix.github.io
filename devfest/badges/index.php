<?php
error_reporting(0);
require_once('ezpdf/class.ezpdf.php');

//CONFIG
$width = 288;
$height = 216;
$x1 = 17.5;
$x2 = $x1+$width;
$y0 = 503;
$yBuff = 0;

$pdf = new Cezpdf('LETTER');

creatBadges($pdf, $height, $width);

$pdf->ezStream();

function handleNameSize($check, $name){
    global $x, $width, $pdf;
    if($width-$pdf->getTextWidth($check, $name)<50){
        $check--;
        return handleNameSize($check,$name);
    }else{
        return $check;
    }
}

function creatBadges(&$pdf, $height, $width){
    global $x1, $x2, $y0, $yBuff;

    $fh = fopen('csv/Attendees.csv','r');

    $img=imagecreatefrompng('devfest-logo-2013.png');

    $y=$y0;
    //$row=fgetcsv($fh);//clear headers
    $count=0;
    $y=$y0+$height+$yBuff;

    while($row=fgetcsv($fh)){

        //x placement
        $x = $count%2 ? $x2 : $x1;
        if(!($count%2)){
            $y -= $height+$yBuff;
        }
        if($y<30){
            $y=$y0;
            $pdf->ezNewPage();
        }

        $count++;

        //frame
        if($_GET['frame']){
            $pdf->rectangle($x,$y,$width,$height);
        }

        $last_name = strtoupper($row[0]);
        $first_name = strtoupper($row[1]);
        $ticket_type = strtoupper($row[3]);
        $school = strtoupper($row[5]);
        $job_title = strtoupper($row[6]);
        $company = strtoupper($row[7]);

        //logo
        $pdf->addImage($img,$x+1,$y-1,93,216,100);

        //brand
        $pdf->selectFont('ezpdf/fonts/OpenSans-Bold.afm');
        $pdf->addText($x+23, $y+185, 20, "GDG");
        $pdf->selectFont('ezpdf/fonts/OpenSans-Regular.afm');
        $pdf->addText($x+70, $y+185, 20, "DevFest Fresno 2013");
        $nameSize=handleNameSize(20, $row[3]." ".$row[2]);
        
        //name
        $pdf->selectFont('ezpdf/fonts/OpenSans-Bold.afm');
        $nameSize=handleNameSize(30, $first_name);
        $pdf->addText($x+(($width-$pdf->getTextWidth($nameSize,$first_name))/2), $y+135, $nameSize, $first_name);

        $pdf->selectFont('ezpdf/fonts/OpenSans-Light.afm');
        $nameSize=handleNameSize(24, $last_name);
        $pdf->addText($x+(($width-$pdf->getTextWidth($nameSize,$last_name))/2), $y+105, $nameSize, $last_name);

        $pdf->selectFont('ezpdf/fonts/OpenSans-Light.afm');

        //school
        if($ticket_type=="STUDENT"){
            $nameSize=handleNameSize(14, $school);
            $pdf->addText($x+(($width-$pdf->getTextWidth($nameSize,$school))/2), $y+80, $nameSize, $school);
        }else{
        //company
            $nameSize=handleNameSize(14, $company);
            $pdf->addText($x+(($width-$pdf->getTextWidth($nameSize,$company))/2), $y+75, $nameSize, $company);

            $nameSize=handleNameSize($nameSize-2, $job_title);
            $pdf->addText($x+(($width-$pdf->getTextWidth($nameSize,$job_title))/2), $y+60, $nameSize, $job_title);
        }

        //modify ticket types here
        if($ticket_type=="STUDENT"){
            $pdf->setColor(.27,.53,.97);
        }else if($ticket_type=="SPEAKER"){
            $pdf->setColor(.95,.40,.13);
        }else if($ticket_type=="VOLUNTEER"){
            $pdf->setColor(.84,.25,.20);
        }else if($ticket_type=="VENDOR"){
            $pdf->setColor(.98,.79,.27);
        }else{
            $pdf->setColor(.04,.64,.35);
        }
        $pdf->filledRectangle($x+1,$y+1,$width-2,30);

        //ticket type
        $pdf->setColor(1,1,1);
        $pdf->selectFont('ezpdf/fonts/OpenSans-Bold.afm');
        $nameSize=16;
        $pdf->addText($x+(($width-$pdf->getTextWidth($nameSize,$ticket_type))/2), $y+10, $nameSize, $ticket_type);
        $pdf->setColor(0,0,0);
    }
}
?>
