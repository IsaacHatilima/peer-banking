<?php

namespace App\Http\Controllers;

use App\Actions\Domain\UpdateDomainAction;
use App\Http\Requests\DomainRequest;
use App\Models\Domain;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Redirect;

class DomainController extends Controller
{
    use AuthorizesRequests;

    public function update(DomainRequest $request, Domain $domain, UpdateDomainAction $domainAction)
    {
        $this->authorize('update', $domain);

        $domainAction($domain, $request);

        return Redirect::back();
    }
}
