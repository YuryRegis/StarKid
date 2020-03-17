
    exports.run = async (client, message, args) => {
        const m = await message.channel.send("ping?");
        let ping = m.createdTimestamp - message.createdTimestamp;
        m.edit(`Pong! Latencia --> ${ping}ms`);
        console.log(`Ping --> ${ping}ms`);
    }

    exports.help = {
        name: "ping"
    }
    