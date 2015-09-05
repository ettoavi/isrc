<?php
class g {
	static $out;
}
include ('/var/www/engine/err-logger.php');

class findWords {
	var $targetDir;
	var $word;
	var $dirList;
	var $count;
	static public function create($word) {
		return new findWords($word);
	}
	public function __construct($word) {
		$this->word = $word;
		return $this;
	}
	public function execute($targetDir){
       $this->targetDir = $targetDir;
	   $this->count =0;
       customScreen::$buffer .= '<table width="1000" border="1" cellspacing="0" cellpadding="0">'.CRLF
                      .'<tr><td class="monofont h" colspan="4">&nbsp;Finding word: '.$this->word.'</td></tr>'.CRLF
                      .'<tr><td class="monofont h" colspan="4">&nbsp;Start Directory: '.$this->targetDir.'</td></tr>'.CRLF;
       $this->dirList = array();
       $this->GetDirList($this->targetDir);
	   $this->readFiles();
       customScreen::$buffer .= '</table>'.CRLF;
	   errTemplate::LoadCss();
	   customScreen::show();
	}
	public function GetDirList($targetDir, $getDirs=false) {
		if( $dh = opendir($targetDir))
        {
            while( false !== ($file = readdir($dh)))
            {
              if( $file == '.' || $file == '..') continue;
              $path = $targetDir . '/' . $file;
              if( is_dir($path)) {
                 $this->dirList[] = $path;
                 $this->GetDirList($path);
				}
            }
            closedir($dh);
        }
	}
	public function readFiles() {
       foreach ($this->dirList as &$targetDir) {
           if( $dh = opendir($targetDir)) {
			      $extfilefound = false; $sresult ='';
                while( false !== ($file = readdir($dh))) {
                    if( $file == '.' || $file == '..') continue;
                    $path = $targetDir . '/' . $file;
                    if( !is_dir($path) && pathinfo($file, PATHINFO_EXTENSION) == 'php') {
						 $line = 0;
						 if ($this->findWordOnFile($path,$line)) {
							 $extfilefound = true;
							 $sresult .= sprintf('<tr><td class="monofont e">&nbsp;%s</td><td class="monofont v">&nbsp;%s</td><td class="monofont v" colspan="2">&nbsp;line %s</td></tr>'.CRLF,++$this->count,$path,$line);
						 }
				      }
                 }
                 closedir($dh);
				 if ($extfilefound) {
				  customScreen::$buffer .= $sresult;
				 }				  
           }
	   }
	}
	
	public function findWordOnFile($fileName,&$line) {
		$text = file_get_contents($fileName);
		if ($npos = strpos($text, $this->word)) {
			$text = substr($text,0,$npos+strlen($this->word));
			$atxt = explode(CRLF,$text);
			$line = count($atxt);
			return true;
		}
		return false;
	}
	
}

?>