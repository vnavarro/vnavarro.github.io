---
layout: post
comments: true
title:  "[QuickTips] Check UDP port availability in Android"
date:   2016-12-20 22:00:00
category: Development
tags: [quicktips, development, mobile, android, java, network, udp]
---

This time I stumble upon a very unusual problem, at least for me, UDP ports collision. A open source library that I used didn't garantee that two different apps using that same library would have different UDP ports, so when I installed two of my prototypes one of them didn't worked properly and unfortunately the library didn't told me that was the problem it gave me a completely generic error.

Long story short, my first solution was to assign random ports but then I wondered if I could check available ports before falling back to random ports, so here it is.

{% highlight java %}
import java.net.DatagramSocket;
import java.net.SocketException;

public class UDPPortRequester() {
  public int request() {
    int udpPort = -1;
    try {
       DatagramSocket dgSocket = new DatagramSocket();
       udpPort = dgSocket.getLocalPort();
       dgSocket.close();
    } catch(SocketException e) {//There is a BindException but it is a children of SocketException, catch it if needed
       Log.e("UDPPortRequester", "Port is probably in use:" + udpPort);
    }
    return udpPort;
  }
}
{% endhighlight %}

Or if your prefer to determine the range of ports yourself

{% highlight java %}
public class UDPPortRequester() {
  int min;
  int max;

  public UDPPortRequester() {
      min = 1024;
      max = 65535;
  }

  protected bool isAvailable(int port) {
    try {
       DatagramSocket dgSocket = new DatagramSocket(port);
       dgSocket.close();
    } catch(SocketException e) {
       Log.e("UDPPortRequester", "Port is probably in use:" + udpPort);
       return false;
    }
    return true;
  }

  protected int randomPort() {
    int port = new Random().nextInt((max-min+1)+min);
    return port;
  }

  public int request() {
    int udpPort = randomPort();
    while (!isAvailable(udpPort)) {
      udpPort = randomPort();
    }
    return udpPort;
  }
}
{% endhighlight %}

The downside of the second way is the possibility of running a forever check in the request method, we could use a retry counter to solve this but still I would rather rely on DatagramSocket finding an available port as stated in the [docs](https://docs.oracle.com/javase/7/docs/api/java/net/DatagramSocket.html):

> "DatagramSocket() -> Constructs a datagram socket and binds it to any available port on the local host machine."

Bear in mind that checking port doesn't reserve it, so if a service requests that same port before you use it then you lost it.

There are ways to solve it and depends on how you want your software to behave, yet in general that approach has no problems in Android.
