
var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var TypeInsnNode = Java.type("org.objectweb.asm.tree.TypeInsnNode");

function initializeCoreMod() {
    return {
        "HelpingHerdsEvents_PunchChicken": {
            "target": {
                "type": "METHOD",
                "class": "bee/beeshroom/helpingherds/core/event/HelpingHerdsEvents",
                "methodName": "PunchChicken",
                "methodDesc": "(Lnet/minecraftforge/event/entity/living/LivingDamageEvent;)V"
            },
            "transformer": function (mn) {
                for (var iterator = mn.instructions.iterator(); iterator.hasNext();) {
                    var node = iterator.next();
                    if (node.getOpcode() === Opcodes.INVOKEVIRTUAL && node.owner.equals("net/minecraft/util/DamageSource") && ASMAPI.mapMethod("func_76346_g").equals(node.name) && node.desc.equals("()Lnet/minecraft/entity/Entity;")) {
                        iterator.next();
                        iterator.remove(); // CHECKCAST net/minecraft/entity/LivingEntity
                    } else if (node.getOpcode() === Opcodes.INVOKEVIRTUAL && node.owner.equals("net/minecraft/entity/LivingEntity") && ASMAPI.mapMethod("func_70651_bq").equals(node.name) && node.desc.equals("()Ljava/util/Collection;")) {
                        mn.instructions.insertBefore(node, new TypeInsnNode(Opcodes.CHECKCAST, "net/minecraft/entity/LivingEntity"));
                    }
                }
                return mn;
            }
        }
    }
}