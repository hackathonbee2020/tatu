<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TalkJS User-to-Operator</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>

<body>
<div class="container" style="max-width: 800px">
    <div class="row">
        <h1>TalkJS User-to-Operator Example</h1>
        <h2>In-app user view</h2>
        <p>Let's assume this is one of the pages in your app, where a user can configure an item or product.</p>
        <p style="font-size: 75%">Note: Before this example will work, you will have to enter your TalkJS credentials in
            the source.</p>
    </div>
    <div class="row">
        <div class="col-md-6">
            <h3>Item 2493</h3>
            <p>Here, there might be some item, order or product that the user is configuring.</p>
            <p>To the right, there is a chatbox where the user can discuss the item, order or product with an
                operator.</p>
        </div>
        <div class="col-md-6" id="talkjs-container">
        </div>
    </div>
</div>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="{{ asset('js/bs4/bootstrap.min.js') }}"></script>

<script type="text/javascript" src="{{ asset('js/sweetalert2.all.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.1/axios.min.js"></script>
<script type="text/javascript" src="{{ asset('js/lightbox.min.js') }}"></script>
<script src="{{ asset('js/jquery.mask.min.js') }}" type="text/javascript"></script>
<script>
    (function (t, a, l, k, j, s) {
        s = a.createElement('script');
        s.async = 1;
        s.src = "https://cdn.talkjs.com/talk.js";
        a.getElementsByTagName('head')[0].appendChild(s);
        k = t.Promise
        t.Talk = {
            ready: {
                then: function (f) {
                    if (k) return new k(function (r, e) {
                        l.push([f, r, e])
                    });
                    l.push([f])
                }, catch: function () {
                    return k && new k()
                }, c: l
            }
        }
    })(window, document, []);
</script>
<script>
{{--    let url = "{{ route('conversations.store' }}";--}}

    Talk.ready.then(function () {

        // The core TalkJS lib has loaded, so let's identify the current user to TalkJS.

        // TODO: replace the fields below with actual user data.
        var me = new Talk.User({
            // must be any value that uniquely identifies this user
            id: '{{Request::get('userId')}}',
            name: '{{Request::get('name')}}',
            email: '{{Request::get('email')}}',
            photoUrl: "https://talkjs.com/docs/img/george.jpg"
        });
        // TODO: add a "configuration" field to the user object so your
        // user can get email notifications.
        // See https://talkjs.com/docs/Emails_and_Configurations.html for more
        // info.

        // TODO: replace the appId below with the appId provided in the Dashboard
        window.talkSession = new Talk.Session({
            appId: "tc7Q1y1H",
            me: me
        });

        // Let's show the chatbox.
        // First, we need to define who we want to talk to.
        //
        // In this case, it's always the operator. The code below is identical
        // to the `var me =` declaration in operator.html
        var operator = new Talk.User({
            // just hardcode any user id, as long as your real users don't have this id
            id: "myapp_operator",
            name: "ExampleApp Operator",
            email: "support@example.com",
            photoUrl: "http://dmssolutions.nl/wp-content/uploads/2013/06/helpdesk.png",
            welcomeMessage: "Hi there! How can I help you?"
        });

        // Now, let's start or continue the conversation with the operator and
        // show the chatbox.

        // You control the ID of a conversation. In this example, we use the item ID as
        // the conversation ID in order to tie this conversation to this item.
    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, operator))
        conversation.setParticipant(me);
        conversation.setParticipant(operator);

        var chatbox = window.talkSession.createChatbox(conversation);
        chatbox.mount(document.getElementById("talkjs-container"));

        // getOrCreateConversation, provavelmente ira pegar o usuario(me) e o usuario(agente)
        chatbox.on("sendMessage", (message) => {
            console.log('sendMessage')
            console.log(message)
            axios.post('api/conversations', {
                recent_message: message.message.text,
                conversation_id: message?.message?.conversationId || null,
                user_id: '{{Request::get('userId')}}',
                user_name: '{{Request::get('name')}}',
                user_email: '{{Request::get('email')}}',
                user_telefone: '84987195148',
                user_cpf: '{{Request::get('cpf')}}',
                department_id: '2b0178f3-cd6a-445d-afd7-afc66f09006e',
                cliente_id: 'af710b12-a111-4717-a466-36f303cb0d65',
                channel_id: 'c65049cd-4dae-4689-b3e4-c62367dbdfc5',
            })
                .then(function (response) {
                    console.log('success')
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
    });

</script>

</body>

</html>
