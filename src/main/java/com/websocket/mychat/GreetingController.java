package com.websocket.mychat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    @SendToUser
    public void greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        simpMessagingTemplate.convertAndSendToUser(message.getTargetUser(), "/queue/specific-user",
                new Greeting(HtmlUtils.htmlEscape(message.getName())));
//        return new Greeting(HtmlUtils.htmlEscape(message.getName()));
    }

}
