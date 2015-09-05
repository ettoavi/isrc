<?php

define('EOLN',"\r");

class showErrorFile {
   static public $instance;
   static public $FText;
   static public $FLine;
   static public function load($fileName,$line) {
	    if ( is_null( self::$instance ) ) {
           self::$instance = new self;
           self::$FLine = $line;
           $Fstr = file_get_contents($fileName);
           self::$FText = str_replace(CRLF,'',explode(EOLN,$Fstr)); 
       }
   }
   static public function show() {
	   $lcount= 0;
	   $start_show = Max(self::$FLine - 25,0);
	   $stop_show  = Min(self::$FLine + 25,count(self::$FText));
	   //customScreen::$buffer .=  '<pre>'; 
	   customScreen::$buffer .= '<table width="1000" border="0" cellspacing="0" cellpadding="0" class="err_source">'.CRLF;
       foreach (self::$FText as &$TxtLine) {
		   ++$lcount;
		   $spanclass = 'class="err_source'.( $lcount === self::$FLine?' h"':'"'); 
		   //echo sprintf('<tr><td>%s</td><td>  %s</td></tr>'.EOLN.CRLF,++$lcount,htmlentities($TxtLine));
		   if ($lcount > $stop_show) break;
		   if ($lcount >= $start_show) 
		   //customScreen::$buffer .=  sprintf('%s <span class="monofont%s">%s</span>'.EOLN.CRLF,$lcount,$spanclass,str_replace(' ','&nbsp;',htmlentities($TxtLine)));
	   customScreen::$buffer .=  sprintf('<tr><td '.$spanclass.'>%s</td><td '.$spanclass.'><pre>  %s</pre></td></tr>'.EOLN.CRLF,$lcount,str_replace(' ','&nbsp;',htmlentities($TxtLine)));
	   }
	   customScreen::$buffer .= '<table>';
      // customScreen::$buffer .=  '</pre>';
	   customScreen::show();
      	   
   }
   static public function write($hook,$content) {
	   //self::getCss();
	   //self::$css = str_replace($hook,$content,self::$css);
	   //return self::$css;
   }
}

?>