<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Get all tasks
    public function index()
    {
        return response()->json(Task::latest()->get());
    }

    // Create a new task
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    // Get one task
    public function show(Task $task)
    {
        return response()->json($task);
    }

    // Update a task
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'status' => 'sometimes|in:pending,in_progress,completed',
            'due_date' => 'sometimes|nullable|date',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    // Delete a task
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }
}
