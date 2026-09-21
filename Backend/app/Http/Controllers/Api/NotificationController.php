<?php

namespace App\Http\Controllers\Api;

use App\Services\NotificationService;

class NotificationController
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function index()
    {
        $notifications = $this->notificationService->mesNotifications();

        return response()->json(['notifications' => $notifications]);
    }
}