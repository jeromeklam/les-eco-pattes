#!/bin/bash
# Installation standard
#--------------------------------------------------------------------------------------
# Author : jeromeklam@free.fr
# Usage  : install.sh <kit de l'application sans extension>
#--------------------------------------------------------------------------------------






#--------------------------------------------------------------------------------------
#
#--------------------------------------------------------------------------------------
exitProgramm ()
{
    echo "######################################################"
    echo "Erreur : $1"
    echo "Message : $2"
    echo ""
    exit $1
}

#--------------------------------------------------------------------------------------
#
#--------------------------------------------------------------------------------------
info ()
{
    echo "# $1"
}

#--------------------------------------------------------------------------------------
#
#--------------------------------------------------------------------------------------
handleAfter ()
{
 ici=`pwd`
 cd $1
 if [ -f ./install/after_install.sh ]; then
     chmod 755 ./install/after_install.sh
     ./install/after_install.sh `pwd`
 fi
 cd $ici
}

#--------------------------------------------------------------------------------------
#
#--------------------------------------------------------------------------------------
handleFiles ()
{
 ici=`pwd`
 basepath=`echo ${ici} | sed -e 's=/=\\\/=g'`
 release=`echo $1 | sed -e 's=/=\\\/=g'`
 for line in `cat $1/install/$cmdFile`; do
     type=`echo $line | cut -d "|" -f1`
     arg1=`echo $line | cut -d "|" -f2`
     arg2=`echo $line | cut -d "|" -f3`
     arg1=`echo $arg1 | sed -e 's/BASEPATH/'${basepath}'/g'`
     arg1=`echo $arg1 | sed -e 's/RELEASE/'${release}'/g'`
     arg2=`echo $arg2 | sed -e 's/BASEPATH/'${basepath}'/g'`
     arg2=`echo $arg2 | sed -e 's/RELEASE/'${release}'/g'`
     case $type in
       "LN") info "    Création d'un lien symbolique $arg1 $arg2..."
             ln -sf $arg1 $arg2 2>/dev/null >/dev/null
             ;;
       "CP") info "    Copie $arg1 $arg2..."
             cp -rf $arg1 $arg2 2>/dev/null >/dev/null
             ;;
       "MKDIR") info "    Création d'un répertoire $arg1 $arg2..."
             mkdir $arg1 2>/dev/null >/dev/null
             if [ "X$arg2" != "X" ]; then
                 chmod $arg2 $arg1 2>/dev/null >/dev/null
             fi
             ;;
       "CHMOD") info "    Modification des droits $arg1 $arg2..."
             chmod $arg2 $arg1 2>/dev/null >/dev/null
             ;;
     esac
 done
 cd $ici
}

#--------------------------------------------------------------------------------------
#
#--------------------------------------------------------------------------------------
cleanUp ()
{
    rm -f $1/.deployignore
    rm -f $1/build.xml
    rm -f $1/Gruntfile.js 2>/dev/null >/dev/null
    rm -f $1/project.properties 2>/dev/null >/dev/null
    rm -f $1/composer.json 2>/dev/null >/dev/null
    rm -f $1/composer.lock 2>/dev/null >/dev/null
    rm -f $1/bower.json 2>/dev/null >/dev/null
}

#--------------------------------------------------------------------------------------
# MAIN
#--------------------------------------------------------------------------------------
ici=`pwd`
cmdFile='install.txt'
info "Vérification des paramètres..."
case $# in
   1) ;;
   2) cmdFile=$2
      ;;
   *) exitProgramm 3 "Le nombre de paramètre est incorrect !"
      ;;
esac

info "Vérification de l'archive..."
if [ ! -f ./$1.tar ]; then
    if [ ! -f ./$1.tar.gz ]; then
        if [ ! -f ./$1.zip ]; then
            exitProgramm 2 "Ancune archive n'a été trouvée : .zip .tar .tar.gz!"
        fi
    fi
fi
info "Vérification du réperoire releases..."
if [ ! -d ./releases ]; then
    info "    création du réperoire releases..."
    mkdir ./releases 2>/dev/null >/dev/null
    if [ $? -ne 0 ]; then
        exitProgramm 1 "Impossible de créer le répertoire release !"
    fi
    chmod 775 ./releases
else
    info "    le réperoire releases existe."
fi
crt=`date +%Y%m%d%H%M%S`
info "    création du répertoire pour la release ./releases/release-${crt}"
mkdir ./releases/release-${crt} 2>/dev/null >/dev/null
if [ $? -ne 0 ]; then
    exitProgramm 3 "Impossible de créer le répertoire de la release !"
fi
cd ./releases/release-$crt
if [ -f ../../$1.tar ]; then
    info "Extraction de l'archive tar..."
    tar xvf ../../$1.tar 2>/dev/null >/dev/null
else
    if [ -f ../../$1.tar.gz ]; then
        info "Extraction de l'archive tar.gz..."
        tar xvzf ../../$1.tar.gz 2>/dev/null >/dev/null
    else
        info "Extraction de l'archive zip..."
        unzip ../../$1.zip 2>/dev/null >/dev/null
    fi
fi
if [ $? -ne 0 ]; then
    cd $ici
    rm -rf ./releases/release-${crt} 2>/dev/null >/dev/null
    exitProgramm 4 "Erreur lors de l'extraction de l'archive !"
fi
cd $ici
info "Gestion du fichier $cmdFile..."
handleFiles ./releases/release-$crt
info "Nettoyage..."
rm -f $1.tar 2>/dev/null >/dev/null
rm -f $1.tar.gz 2>/dev/null >/dev/null
rm -f $1.zip 2>/dev/null >/dev/null
cleanUp ./releases/release-$crt
cd $ici
if [ -L ./current ]; then
    info "Suppression du lien symbolique current..."
    rm -f ./current
    if [ $? -ne 0 ]; then
        exitProgramm 5 "Impossible de supprimer le lien current !"
    fi
fi
info "Création du lien symbolique current..."
ln -sf ./releases/release-${crt} ./current
if [ $? -ne 0 ]; then
    exitProgramm 5 "Impossible de créer le lien current !"
fi
info "Suppression des anciennes versions..."
nb=0
for dir in `ls ./releases/ | sort -r`; do
    if [ $nb -ge 5 ]; then
        rm -rf ./releases/$dir 2>/dev/null >/dev/null
    fi
    nb=`expr $nb + 1`
done
cd $ici
info "Gestion du script après installation..."
handleAfter ./releases/release-$crt
cd $ici
chmod -R 775 ./releases 2>/dev/null >/dev/null
rm -rf ./install 2>/dev/null >/dev/null
rm -f ./install-*.sh 2>/dev/null >/dev/null
rm -f ./*.checksum 2>/dev/null >/dev/null
info ""
info "That's all folks...."