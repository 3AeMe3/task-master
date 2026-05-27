import { STATUS } from "../../generated/prisma/client";
import { CreateSubTaskInput, CreateTaskCommentInput, CreateTaskTagInput, CreateTaskInput, UpdateTaskInput } from "./task.schemas";
export declare function getTasks(userId: number): Promise<({
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
})[]>;
export declare function createTask(userId: number, input: CreateTaskInput): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function findTask(userId: number, taskId: number): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function completeTask(userId: number, taskId: number): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function deleteTask(userId: number, taskId: number): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function addTaskTag(userId: number, taskId: number, input: CreateTaskTagInput): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function removeTaskTag(userId: number, taskId: number, tagId: number): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function editTask(userId: number, taskId: number, input: UpdateTaskInput): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function createSubTask(userId: number, taskId: number, input: CreateSubTaskInput): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function toggleSubTask(userId: number, taskId: number, subTaskId: number): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function deleteSubTask(userId: number, taskId: number, subTaskId: number): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function createTaskComment(userId: number, taskId: number, input: CreateTaskCommentInput): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
export declare function deleteTaskComment(userId: number, taskId: number, commentId: number): Promise<{
    comments: ({
        author: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        content: string;
        taskId: number;
        authorId: number;
    })[];
    project: {
        id: number;
        name: string;
        userId: number;
    };
    taskTags: ({
        tag: {
            id: number;
            name: string;
        };
    } & {
        taskId: number;
        tagId: number;
    })[];
    subTasks: {
        id: number;
        title: string;
        description: string | null;
        completed: boolean;
        taskId: number;
    }[];
} & {
    id: number;
    status: STATUS;
    dueDate: Date | null;
    title: string;
    description: string | null;
    priority: import("../../generated/prisma/enums").PRIORITY;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    projectId: number;
    assigneeId: number | null;
}>;
//# sourceMappingURL=task.service.d.ts.map