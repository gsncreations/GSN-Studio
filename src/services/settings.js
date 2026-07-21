export function buildSettings(assignments) {

    return {

        startup: assignments.startup || 1,

        singleTap: assignments.singleTap || 2,

        doubleTap: assignments.doubleTap || 3,

        longPress: assignments.longPress || 4,

    };

}