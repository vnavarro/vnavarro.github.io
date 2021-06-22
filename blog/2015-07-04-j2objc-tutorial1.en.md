---
title:  "[DevTools] J2ObjC: How to translate and basic automation with bash"
date:   2015-07-04 14:46:00
category: Development
tags: [cross-platform, j2objc, java, android, ios]
image: assets/img/09.jpg
background: "#353b48"
---
Since J2ObjC[^1] it's quite useful I shall bring some technical tips while I'm working with it.

##Translating java source files

This task is quite straightforward, the only thing we had to pay attention is to take care not using unsupported libraries, pretty much everything in standard java libraries is possibly translated.

To know what is or isn't supported you can simply take a look on J2ObjC include folder after extracting a release package.

Now onto action we go. Having a Foo.java that returns "foo bar" string for example (really stupid I know):

{% highlight java %}
public class Foo {
  public static String magic() {  
    return "foo bar";  
  }  
}  
{% endhighlight %}

Pass Foo.java to J2ObjC in the terminal to see the translation happening.

{% highlight sh %}
./pathtoj2objc/j2objc -user-arc Foo.java
{% endhighlight %}

This command will output Foo.h and Foo.m ready to be used in Xcode.

##Improving organisation

Until now translation is quite simple. But, what if you're using a more real structure that have two packages with one class each, let's pretend we have something like this:

{% highlight sh %}
project
  src
    mypackageA
      Foo.java
    mypackageB
      Bar.java
{% endhighlight %}

For that package structure we would need more parameters:

{% highlight sh %}
./pathtoj2objc/j2objc -use-arc -sourcepath "/pathtoproject/src/" mypackageA/Foo.java mypackageB/Bar.java
{% endhighlight %}

Dismantling this command we have:

* -user-arc: obviously enable arc.
* -sourcepath: path to source root.
* the last parameters are *.java files path to be translated.
* it outputs *.h/*.m using the same package folder structure in J2ObjC folder.

Still too awkward, I want to organize things a bit. Would be better to output to a specific place and I want the option to skip package directories. For that purposes there are -d and --no-package-directories respectively, now try the following command:

{% highlight sh %}
./pathtoj2objc/j2objc -use-arc -d "/outputpath/mytranslated_project" --no-package-directories -sourcepath "/pathtoproject/src/" mypackageA/Foo.java mypackageB/Bar.java
{% endhighlight %}

Much better, don't you think?  

The last point that need fixing in this case is the need to pass every *.java manually. Here comes *find* to the rescue, if you try `find "/pathtosource" -type f -name "*.java"` it will print a list of *.java paths:

{% highlight sh %}
/pathtosource/mypackageA/Foo.java
/pathtosource/mypackageB/Bar.java
{% endhighlight %}

Keep on and try everything together:

{% highlight sh %}
./pathtoj2objc/j2objc -use-arc -d "/outputpath/mytranslated_project" --no-package-directories -sourcepath "/pathtoproject/src/" $(find "/pathtosource" -type f -name "*.java")
{% endhighlight %}

## Special powers: automation
Now we have a nice command which can be automated to fill our needs, great!

Start by creating a translate_myproject.sh, then inside it configure the file as bash and add some docs.

{% highlight sh %}
#!/usr/bin/env bash
#
# Translate my java project to objective-c using Google's J2ObjC
{% endhighlight %}

Ok so you would tell me to put the last command we tried inside .sh file save it and call it for the day.... not so fast. Instead of doing things in a rush let's keep it clean.

{% highlight sh %}
#!/usr/bin/env bash  
#  
# Translate my java project to objective-c using Google's J2ObjC  
java_source_paths=$(find "/pathtoprojectsource" -type f -name "*.java")  

bash "/pathtoj2objc/j2objc" -use-arc -d "/pathtoprojectoutput" -sourcepath "/pathtoprojectsource/" --no-package-directories ${java_source_paths}
{% endhighlight %}

Awesome! Go on, save it, change permissions and try running your script to see the magic happening.

> Run chmod with desired permissions in *.sh files to allow them to run. chmod +xrw script.sh will do.[^2]

This is a very simple script that you can run every time you need to update your translated source. There are still other improvements you could do if you wish so.

As an example, we can avoid crashing when no .java files are found. Add the following right after find command.

{% highlight sh %}
if [ -z "$java_source_paths" ]; then #check for null string
  echo "No *.java files found" >&2 #>&2 echoes in standard error output
  exit ${NON_ZERO_ERROR_CODE} #you can exit with any non zero value, just keep track of error codes, promise me.
fi
{% endhighlight %}

That is it for now. Start translating and happy coding.

[^1]:[J2ObjC documentation page](http://j2objc.org/docs/)
[^2]:[Understanding chmod article](http://www.perlfect.com/articles/chmod.shtml)
